'use strict'

const Pepite = require('./pepite.model')

class PepiteController {
  ping(req, res) {
    res.json('pong')
  }

  getAll(req, res) {
    return Pepite.find()
      .then((pepites) => {
        res.json(pepites)
      })
      .catch((err) => {
        req.log.error(err)
        return res.status(500).send(err)
      })
  }

  getPepite(req, res) {
    return Pepite
      .findById(req.params.id).exec()
      .then((pepite) => {
        if (!pepite) {
          return res.sendStatus(404)
        }
        return res.json(pepite)
      })
      .catch((err) => {
        req.log.error(err)
        return res.status(500).send(err)
      })
  }
}

module.exports = PepiteController
