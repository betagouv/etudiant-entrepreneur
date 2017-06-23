'use strict'

const statQuery = require('./stat.query')

class StatController {
  ping(req, res) {
    res.json('pong')
  }

  applicationSummary(req, res) {
    return statQuery.applicationSummary()
      .then((pepiteApplications) => {
        return res.json(pepiteApplications)
      })
      .catch((err) => {
        req.log.error(err)
        return res.status(500).send(err)
      })
  }

  applicationGenderSummary(req, res) {
    return statQuery.applicationGenderSummary()
      .then((applicationGenderSummary) => {
        if (applicationGenderSummary.length) {
          return res.json(applicationGenderSummary[0])
        }
        else {
          return res.json({})
        }
      })
      .catch((err) => {
        req.log.error(err)
        return res.status(500).send(err)
      })
  }

  applicationStudentSummary(req, res) {
    return statQuery.applicationStudentSummary()
      .then((applicationStudentSummary) => {
        if (applicationStudentSummary.length) {
          return res.json(applicationStudentSummary[0])
        }
        else {
          return res.json({})
        }
      })
      .catch((err) => {
        req.log.error(err)
        return res.status(500).send(err)
      })
  }

  applicationDiplomaSummary(req, res) {
    return statQuery.applicationDiplomaSummary()
      .then((applicationDiplomaSummary) => {
        if (applicationDiplomaSummary.length) {
          return res.json(applicationDiplomaSummary[0])
        }
        else {
          return res.json({})
        }
      })
      .catch((err) => {
        req.log.error(err)
        return res.status(500).send(err)
      })
  }

  applicationStatusSummary(req, res) {
    return statQuery.applicationStatusSummary()
      .then((applicationStatusSummary) => {
        if (applicationStatusSummary.length) {
          return res.json(applicationStatusSummary[0])
        }
        else {
          return res.json({})
        }
      })
      .catch((err) => {
        req.log.error(err)
        return res.status(500).send(err)
      })
  }
}

module.exports = StatController
