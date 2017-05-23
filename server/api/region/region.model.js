'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var RegionSchema = new Schema({
  _id: Number,
  name: { type: String, unique: true }
})

module.exports = mongoose.model('Region', RegionSchema)
