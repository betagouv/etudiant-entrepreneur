'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var EstablishmentSchema = new Schema({
  _id: Number,
  name: { type: String },
  pepite: { type: Number, ref: 'Pepite' },
  region: { type: Number, ref: 'Region' }
})

module.exports = mongoose.model('Establishment', EstablishmentSchema)
