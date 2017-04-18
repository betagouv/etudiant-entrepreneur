'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

const CommitteeSchema = new Schema({
  pepite: { type: Number, ref: 'Pepite', index: true },
  date: { type: Date, required: true },
  lastApplicationDate : { type: Date, required: true },
  message: { type: String, maxlength: 160 }
}, {
  timestamps: true
})

module.exports = mongoose.model('Committee', CommitteeSchema, 'committees')
