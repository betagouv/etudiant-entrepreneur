'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ApplicationSchema = new Schema({
  date: { type: Date, default: Date.now },
  contact: {
    name: { type: String, required: true },
    firstname: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    situation: { type: String, required: true },
    isRenew: { type: String, required: true }
  },
  project: {},
  career: {},
  pepite: {},
  profile: {}
})

module.exports = mongoose.model('Application', ApplicationSchema)
