const express = require('express')
const Controller = require('./stat.controller')

var router = express.Router()

module.exports = (options) => {
  var stat = new Controller(options)
  router.get('/ping', stat.ping)
  router.get('/applicationSummary', stat.applicationSummary)
  router.get('/applicationGenderSummary', stat.applicationGenderSummary)
  router.get('/applicationStudentSummary', stat.applicationStudentSummary)
  router.get('/applicationDiplomaSummary', stat.applicationDiplomaSummary)
  router.get('/applicationStatusSummary', stat.applicationStatusSummary)
  return router
}
