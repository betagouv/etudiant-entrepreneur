const express = require('express')
const Controller = require('./system.controller')

var router = express.Router()

module.exports = (options) => {
  var systemController = new Controller(options)
  router.get('/ping', systemController.ping)
  return router
}