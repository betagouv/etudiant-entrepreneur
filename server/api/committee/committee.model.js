'use strict'

const mongoose = require('mongoose')
const dateHelper = require('../lib/testUtils/dateHelper')
const Schema = mongoose.Schema

const CommitteeSchema = new Schema({
  pepite: { type: Number, ref: 'Pepite', index: true },
  date: { type: Date, required: true },
  lastApplicationDate: { type: Date, required: true },
  message: { type: String, maxlength: 160 }
}, {
  timestamps: true
})

CommitteeSchema.statics = {
  getNextCommittee: function (pepiteId) {
    return this.findOne({
      pepite: pepiteId,
      lastApplicationDate: {
        $gte: dateHelper.yesterday()
      }
    })
      .sort({ lastApplicationDate: 1 })
      .exec()
  }
}

module.exports = mongoose.model('Committee', CommitteeSchema, 'committees')
