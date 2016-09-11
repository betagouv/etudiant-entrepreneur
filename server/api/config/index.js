'use strict'

const all = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://mongo:27017/ee',
    options: {
      db: {
        safe: true
      },
      Promise: require('bluebird')
    }
  }
}

module.exports = all
