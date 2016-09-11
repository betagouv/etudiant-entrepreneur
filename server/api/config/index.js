'use strict'

const all = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://mongo:27017/ee',
    options: {
      db: {
        safe: true
      }
    }
  }
}

module.exports = all
