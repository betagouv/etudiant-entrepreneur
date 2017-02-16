'use strict'

const Region = require('./region.model')
const Establishment = require('../establishment/establishment.model')

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

  getEstablishments(req, res) {
    return Region
      .findById(req.params.id)
      .then((region) => {
        if (!region) {
          return res.sendStatus(404)
        }
        return getRegionEstablishments(req, res, region.id)
      })
      .catch((err) => {
        req.log.error(err)
        return res.status(500).send(err)
      })
  }
}

function getRegionEstablishments(req, res, regionId) {
  return Establishment.find({ region: regionId })
    .then((establishments) => {
      res.json(establishments)
    })
    .catch((err) => {
      req.log.error(err)
      return res.status(500).send(err)
    })
}

module.exports = RegionController
