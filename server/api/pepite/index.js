const express = require('express')
const Controller = require('./pepite.controller')
const ApplicationController = require('../application/application.controller')
const auth = require('../auth/auth.service.js')

var router = express.Router()

module.exports = (options) => {
  var pepiteController = new Controller(options)
  var applicationController = new ApplicationController(options)
  router.get('/ping', pepiteController.ping)
  router.get('/', pepiteController.getAll)
  router.get('/:id(\\d+)', pepiteController.getPepite)
  router.get('/:id(\\d+)/application', auth.isAuthenticated(), applicationController.getPepiteApplications)
  router.get('/:id(\\d+)/application/xls', auth.isAuthenticated(), applicationController.getPepiteApplicationsXls)
  return router
}
