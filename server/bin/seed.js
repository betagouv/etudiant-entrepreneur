#!/usr/bin/env node
/* eslint-disable no-console */
const mongoose = require('mongoose')
const Pepite = require('../api/pepite/pepite.model')
const Region = require('../api/region/region.model')
const Establishment = require('../api/establishment/establishment.model')
const User = require('../api/user/user.model')
const pepitesData = require('../api/pepite/pepite.seed')
const regionData = require('../api/region/region.seed')
const establishmentData = require('../api/establishment/establishment.seed')

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
  Pepite.remove(handlePepiteRemoved)
}

function handlePepiteRemoved() {
  console.log('Seed pepite collection')
  Pepite.insertMany(pepitesData, handlePepiteInserted)
}

function handlePepiteInserted() {
  console.log('Clear user collection')
  User.remove(handleUserRemoved)
}

function handleUserRemoved() {
  console.log('Seed user collection')
  const users = pepitesData.map(p => { return (Object.assign(p, { pepite: p._id, password: 'test' })) })
  console.log(users)
  User.insertMany(users, handleUserInserted).catch((err) => console.log(err))
}

function handleUserInserted() {
  console.log('Clear region collection')
  Region.remove(handleRegionRemoved)
}

function handleRegionRemoved() {
  console.log('Seed region collection')
  Region.insertMany(regionData, handleRegionInserted)
}

function handleRegionInserted() {
  console.log('Clear establishment collection')
  Establishment.remove(handleEstablishmentRemoved)
}

function handleEstablishmentRemoved() {
  console.log('Seed establishment collection')
  Establishment.insertMany(establishmentData, handleEstablishmentInserted)
}

function handleEstablishmentInserted(error, docs) {
  console.log(error)
  console.log(docs)
  process.exit(0)
}
