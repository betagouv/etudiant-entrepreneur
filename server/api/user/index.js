const express = require('express')
const Controller = require('./user.controller')

var router = express.Router()

module.exports = (options) => {
  var userController = new Controller(options)
  router.get('/ping', userController.ping)
  router.get('/', userController.index)
  return router
}
