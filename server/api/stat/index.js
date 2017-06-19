const express = require('express')
const Controller = require('./stat.controller')

var router = express.Router()

module.exports = (options) => {
  var stat = new Controller(options)
  router.get('/ping', stat.ping)
  router.get('/applicationSummary', stat.applicationSummary)
  return router
}
