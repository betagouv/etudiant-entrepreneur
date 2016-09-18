const express = require('express')
const Controller = require('./application.controller')

var router = express.Router()

module.exports = (options) => {
  var applicationController = new Controller(options)
  router.get('/ping', applicationController.ping)
  router.get('/:id', applicationController.getApplication)
  router.post('/', applicationController.createApplication)
  router.put('/:id', applicationController.updateApplication)
  router.put('/:id/send', applicationController.sendApplication)
  return router
}
