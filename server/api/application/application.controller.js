'use strict'

const Application = require('./application.model')
const StandardError = require('standard-error')
const mongoose = require('mongoose')

class ApplicationController {
  ping(req, res) {
    res.json('pong')
  }

  getApplication(req, res) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.sendStatus(404)
    }
    return Application
      .findById(req.params.id).exec()
      .then((application) => {
        if (!application) {
          return res.sendStatus(404)
        }
        return res.json(application)
      })
      .catch((err) => {
        req.log.error(err)
        return res.status(500).send(err)
      })
  }

  createApplication(req, res, next) {
    Application.create(req.body)
      .then((application) => {
        return res.status(201).json(application)
      })
      .catch((err) => {
        if (err.name == 'ValidationError') {
          return next(new StandardError('Mes informations doit être rempli', {code: 400}))
        }
      })
  }
}


module.exports = ApplicationController
