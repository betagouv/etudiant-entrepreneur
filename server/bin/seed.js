#!/usr/bin/env node
const mongoose = require('mongoose')
const Pepite = require('../api/pepite/pepite.model')
const pepites = require('../api/pepite/pepite.seed')

const config = require('../api/config')

mongoose.Promise = require('bluebird')
// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options)

//This callback will be triggered once the connection is successfully established to MongoDB
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + config.mongo.uri)
  startSeed()
})

//This callback will be triggered after getting disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected from ' + config.mongo.uri)
})

function startSeed() {
  console.log('Clear pepite collection')
  Pepite.remove()

  console.log('Seed pepite collection')
  Pepite.insertMany(pepites)
}

