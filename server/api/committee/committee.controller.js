'use strict'

const mongoose = require('mongoose')

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

  getCommittee(req, res) {
    Committee.find({ pepite: req.pepite.id }).exec()
      .then((committees) => {
        return res.status(200).json(committees)
      })
  }

  getNextCommittee(req, res) {
    Committee.getNextCommittee(req.pepite.id)
      .then((nextCommittee) => {
        if (!nextCommittee) {
          return res.sendStatus(404)
        }
        return res.status(200).json(nextCommittee)
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

  updateCommittee(req, res) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.sendStatus(404)
    }
    return Committee
      .findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
      .then((committee) => {
        if (!committee) {
          return res.sendStatus(404)
        }
        return res.json(committee)
      })
      .catch((err) => {
        req.log.error(err)
        if ((err.name == 'ValidationError') || (err.name == 'CastError')) {
          return res.sendStatus(400)
        }
        return res.status(500).send(err)
      })
  }

  deleteCommittee(req, res) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.sendStatus(404)
    }
    return Committee
      .findOneAndRemove({ _id: req.params.id })
      .then((committee) => {
        if (!committee) {
          return res.sendStatus(404)
        }
        return res.send(204)
      })
      .catch((err) => {
        req.log.error(err)
        return res.status(500).send(err)
      })
  }
}

module.exports = CommitteeController
