const express = require('express')
const Controller = require('./region.controller')

var router = express.Router()

module.exports = (options) => {
  var regionController = new Controller(options)
  router.get('/ping', regionController.ping)
  router.get('/', regionController.getAll)
  router.get('/:id(\\d+)', regionController.getRegion)
  router.get('/:id(\\d+)/establishment', regionController.getEstablishments)
  router.get('/:id(\\d+)/pepite', regionController.getPepites)
  return router
}
