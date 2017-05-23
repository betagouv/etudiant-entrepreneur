'use strict'

const establishment = require('./establishment.model')

class EstablishmentController {
  ping(req, res) {
    res.json('pong')
  }

  getAll(req, res) {
    return establishment.find()
      .then((establishments) => {
        res.json(establishments)
      })
      .catch((err) => {
        req.log.error(err)
        return res.status(500).send(err)
      })
  }

  getEstablishment(req, res) {
    return establishment
      .findById(req.params.id).exec()
      .then((establishment) => {
        if (!establishment) {
          return res.sendStatus(404)
        }
        return res.json(establishment)
      })
      .catch((err) => {
        req.log.error(err)
        return res.status(500).send(err)
      })
  }
}

module.exports = EstablishmentController
