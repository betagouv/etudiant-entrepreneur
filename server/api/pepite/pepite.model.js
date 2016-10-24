'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var PepiteSchema = new Schema({
  name: { type: String, unique: true }
})

module.exports = mongoose.model('Pepite', PepiteSchema)
