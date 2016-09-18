'use strict'

const Application = require('./application.model')
const StandardError = require('standard-error')
const mongoose = require('mongoose')
const sendMail = require('../components/mail/send-mail').sendMail


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
        sendMail(
          application.contact.email,
          'Sauvegarde de ta candidature au statut Étudiant entrepreneur',
          getSaveEmailBody(application),
          () => {})
        return res.status(201).json(application)
      })
      .catch((err) => {
        if (err.name == 'ValidationError') {
          return next(new StandardError('Mes informations doit être rempli', { code: 400 }))
        }
        req.log.error(err)
        return res.status(500).send(err)
      })
  }

  updateApplication(req, res) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.sendStatus(404)
    }
    return Application
      .findByIdAndUpdate(req.params.id, req.body, {new: true})
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
}

function getSaveEmailBody(application) {
  return ('<html><body><p>Bonjour,</p>' +
    '<p>Tu as commencé ta candidature sur etudiant-entrepreneur.beta.gouv.fr</p>' +
    '<p>Tu peux finaliser ta demande quand tu veux à cette adresse :</p>' +
    '<a href="https://etudiant-entrepreneur.beta.gouv.fr/application/' + application._id + '" target="_blank">ta candidature</a>' +
    '<p>Si tu as la moindre question, n\'hésites pas à nous contacter à contact@etudiant-entrepreneur.beta.gouv.fr</p>')
}

module.exports = ApplicationController
