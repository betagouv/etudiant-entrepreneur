'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ApplicationSchema = new Schema({
  name: { type: String, required:true }
})

module.exports = mongoose.model('Application', ApplicationSchema)
