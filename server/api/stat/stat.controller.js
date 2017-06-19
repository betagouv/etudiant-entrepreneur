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
}

module.exports = StatController
