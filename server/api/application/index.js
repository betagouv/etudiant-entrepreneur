const express = require('express')
const Controller = require('./application.controller')

const auth = require('../auth/auth.service.js')
var router = express.Router()

module.exports = (options) => {
  var applicationController = new Controller(options)
  router.get('/ping', applicationController.ping)
  router.get('/:id', applicationController.getApplication)
  router.get('/', auth.hasRole('admin'), applicationController.getFilteredApplication)
  router.post('/', applicationController.createApplication)
  router.put('/:id', applicationController.updateApplication)
  router.put('/:id/send', applicationController.sendApplication)
  router.get('/:id/certificate', auth.isAuthenticated(), applicationController.getApplicationCertificate)
  router.get('/:id/other', auth.isAuthenticated(), applicationController.getOtherApplication)
  return router
}
