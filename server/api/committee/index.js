const express = require('express')
const Controller = require('./committee.controller')

const auth = require('../auth/auth.service.js')
var router = express.Router({mergeParams: true})

module.exports = (options) => {
  var committeeController = new Controller(options)
  router.use(committeeController.getPepite)
  router.get('/ping', committeeController.ping)
  router.get('/', committeeController.getCommittee)
  router.get('/next', committeeController.getNextCommittee)
  router.post('/', auth.isAuthenticated(), committeeController.createCommittee)
  router.put('/:id', auth.isAuthenticated(), committeeController.updateCommittee)
  router.delete('/:id', auth.isAuthenticated(), committeeController.deleteCommittee)
  return router
}
