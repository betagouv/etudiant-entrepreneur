const express = require('express')
const Controller = require('./committee.controller')

const auth = require('../auth/auth.service.js')
var router = express.Router({mergeParams: true})

module.exports = (options) => {
  var committeeController = new Controller(options)
  router.use(committeeController.getPepite)
  router.get('/ping', committeeController.ping)
  router.post('/', auth.isAuthenticated(), committeeController.createCommittee)
  return router
}
