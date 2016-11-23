const express = require('express')
const Controller = require('./pepite.controller')

var router = express.Router()

module.exports = (options) => {
  var pepiteController = new Controller(options)
  router.get('/ping', pepiteController.ping)
  router.get('/', pepiteController.getAll)
  router.get('/:id(\\d+)', pepiteController.getPepite)
  return router
}
