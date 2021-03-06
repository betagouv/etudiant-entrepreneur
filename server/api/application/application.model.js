'use strict'

const crypto = require('crypto')
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ApplicationSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, unique: true, default: function () { return this.getLinkId() } },
  date: { type: Date, default: Date.now },
  contact: {
    name: { type: String, required: true },
    firstname: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    situation: { type: String, required: true },
    isRenew: { type: String, required: true },
    schoolYear: { type: Number, required: true }
  },
  project: {},
  career: {},
  pepite: {},
  profile: {},
  status: { type: String, default: 'saved' },
  sentDate: { type: Date }
})

ApplicationSchema.methods = {
  getLinkId: function () {
    return crypto.randomBytes(12).toString('hex')
  }
}

ApplicationSchema.statics = {
  getUnregisteredTeamMembers: function (teamMembers) {
    return this.find({
      'contact.email': {
        $in: teamMembers.map((member) => { member.email })
      }
    })
      .exec()
      .then((registeredTeamMembers) => {
        return teamMembers.filter((teamMember) => {
          return !registeredTeamMembers.some((registeredTeamMember) => {
            return registeredTeamMember.contact.email != teamMember.email
          })
        })
      })
  },

  getOtherApplication: function (id) {
    return this.findById(id).exec().then((application) => {
      if (!application) {
        return null
      }
      return this.aggregate(
        [
          {
            $match: {
              _id: { $ne: application._id },
              'contact.email': application.contact.email,
              'contact.schoolYear': application.contact.schoolYear,
              'status' : { $ne: 'saved' }
            }
          },
          {
            $project: {
              pepite: '$pepite.pepite',
              status: '$status',
              sentDate: '$sentDate'
            }
          },
          {
            $sort: {
              status: 1
            }
          }
        ]
      )
    })
  }
}

module.exports = mongoose.model('Application', ApplicationSchema, 'applications')
