'use strict'

const Pepite = require('./pepite.model')
const StandardError = require('standard-error')
const mongoose = require('mongoose')

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
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.sendStatus(404)
    }
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

  createPepite(req, res, next) {
    Pepite.create(req.body)
      .then((pepite) => {
        return res.status(201).json(pepite)
      })
      .catch((err) => {
        req.log.error(err)
        return res.status(500).send(err)
      })
  }

  updatePepite(req, res) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.sendStatus(404)
    }
    return Pepite
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
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
