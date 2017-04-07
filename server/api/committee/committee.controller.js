'use strict'

const Committee = require('./committee.model')
const Pepite = require('../pepite/pepite.model')


class CommitteeController {
  ping(req, res) {
    res.json('pong')
  }

  getPepite(req, res, next) {
    return Pepite
      .findById(req.params.pepiteId).exec()
      .then((pepite) => {
        if (!pepite) {
          return res.sendStatus(404, '')
        }
        req.pepite = pepite
        next()
      })
      .catch((err) => {
        req.log.error(err)
        return res.status(500).send(err)
      })
  }

  createCommittee(req, res) {
    Committee.create(Object.assign({}, req.body, { pepite: req.pepite.id }))
      .then((committee) => {
        return res.status(201).json(committee)
      })
      .catch((err) => {
        req.log.error(err)
        if (err.name == 'ValidationError') {
          return res.sendStatus(400)
        }
        return res.status(500).send(err)
      })
  }
}

module.exports = CommitteeController
