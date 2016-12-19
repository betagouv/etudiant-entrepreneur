#!/usr/bin/env node
/* eslint-disable no-console */
const mongoose = require('mongoose')
const User = require('../api/user/user.model')
const usersData = require('../api/user/user.seed')

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
  console.log('Clear user collection')
  removeUsers()
}

function removeUsers() {
  console.log('Clear user collection')
  User.remove(handleUserRemoved)
}

function handleUserRemoved() {
  console.log('Seed user collection')

  User.insertMany(usersData, handleUserInserted).catch((err) => console.log(err))
}

function handleUserInserted() {
  process.exit(0)
}

