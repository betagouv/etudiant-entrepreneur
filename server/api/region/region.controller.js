'use strict'

const Region = require('./region.model')

class RegionController {
  ping(req, res) {
    res.json('pong')
  }

  getAll(req, res) {
    return Region.find()
      .then((regions) => {
        res.json(regions)
      })
      .catch((err) => {
        req.log.error(err)
        return res.status(500).send(err)
      })
  }

  getRegion(req, res) {
    return Region
      .findById(req.params.id).exec()
      .then((region) => {
        if (!region) {
          return res.sendStatus(404)
        }
        return res.json(region)
      })
      .catch((err) => {
        req.log.error(err)
        return res.status(500).send(err)
      })
  }
}

module.exports = RegionController
