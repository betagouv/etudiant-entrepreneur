'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var EstablishmentSchema = new Schema({
  _id: Number,
  name: { type: String },
  pepite: { type: Number, ref: 'Pepite', index: true },
  region: { type: Number, ref: 'Region', index: true }
})

module.exports = mongoose.model('Establishment', EstablishmentSchema)
