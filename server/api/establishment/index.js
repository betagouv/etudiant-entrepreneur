const express = require('express')
const Controller = require('./establishment.controller')

var router = express.Router()

module.exports = (options) => {
  var establishmentController = new Controller(options)
  router.get('/ping', establishmentController.ping)
  router.get('/', establishmentController.getAll)
  router.get('/:id(\\d+)', establishmentController.getEstablishment)
  return router
}
