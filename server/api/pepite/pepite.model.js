'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var PepiteSchema = new Schema({
  _id: Number,
  name: { type: String, unique: true },
  email: { type: String, unique: true }
})

module.exports = mongoose.model('Pepite', PepiteSchema)
