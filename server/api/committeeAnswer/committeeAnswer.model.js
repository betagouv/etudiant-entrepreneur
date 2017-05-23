'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

const CommitteeAnswerSchema = new Schema({
  opinion: { type: String, required: true },
  hasD2E: { type: Boolean, required: true },
  status: { type: String, enum: ['accepted', 'refused'], required: true },
})

module.exports = mongoose.model('CommitteeAnswer', CommitteeAnswerSchema, 'applications')
