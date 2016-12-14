const express = require('express')
const Controller = require('./committeeAnswer.controller')

const auth = require('../auth/auth.service.js')
var router = express.Router()

module.exports = (options) => {
  var committeeAnswerController = new Controller(options)
  router.get('/ping', committeeAnswerController.ping)
  router.put('/:id', auth.isAuthenticated(), committeeAnswerController.updateAnswer)
  return router
}
