'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

const CommitteeSchema = new Schema({
  pepite: { type: Number, ref: 'Pepite', index: true },
  date: { type: Date, required: true }
}, {
  timestamps: true
})

module.exports = mongoose.model('Committee', CommitteeSchema, 'committees')
