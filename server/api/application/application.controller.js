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
          () => { })
        return res.status(201).json(application)
      })
      .catch((err) => {
        if (err.name == 'ValidationError') {
          return next(new StandardError('La page \'Mes informations\' doit être correctement remplie', { code: 400 }))
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
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
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

  sendApplication(req, res, next) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.sendStatus(404)
    }
    return Application
      .findById(req.params.id).exec()
      .then((application) => {
        if (application.status == 'sent') {
          return next(new StandardError('Tu a déjà soumis ta candidature', { code: 400 }))
        }
        req.body.status = 'sent'
        req.body.sentDate = new Date()
        return Application
          .findByIdAndUpdate(req.params.id, req.body, { new: true })
          .then((application) => {
            if (!application) {
              return res.sendStatus(404)
            }
            //notify applicant
            sendMail(
              application.contact.email,
              'Confirmation d\'envoi de ta candidature au statut Étudiant-entrepreneur',
              getSendEmailBody(application),
              () => { })
            //notify pepite
            sendMail(
              getPepite(application.pepite.pepite).email,
              'Nouvelle candidature',
              getPepiteEmailBody(application),
              () => { })
            return res.json(application)
          })
          .catch((err) => {
            req.log.error(err)
            return res.status(500).send(err)
          })
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

function getSendEmailBody(application) {
  return ('<html><body><p>Bonjour,</p>' +
    `<p>Ta candidature a bien été envoyée au PEPITE ${getPepite(application.pepite.pepite).name} qui reviendra vers toi pour les prochaines étapes.</p>` +
    '<p>Ta  candidature passera en comité d\'engagement, la date de ce comité te sera donnée par ton PEPITE.</p>' +
    '<a href="https://etudiant-entrepreneur.beta.gouv.fr/application/' + application._id + '" target="_blank">ta candidature</a>' +
    '<p>Si tu as la moindre question, n\'hésites pas à nous contacter à contact@etudiant-entrepreneur.beta.gouv.fr</p>' +
    '<p>Bonne aventure entreprenariale !</p>')
}

function getPepiteEmailBody(application) {
  return ('<html><body><p>Bonjour,</p>' +
    `<p>Vous avez reçu une nouvelle candidature de la part de ${application.contact.firstname} ${application.contact.name}.</p>` +
    '<p>Vous retrouverez le dossier complet à l\'adresse :</p>' +
    '<a href="https://etudiant-entrepreneur.beta.gouv.fr/application/' + application._id + '" target="_blank">candidature</a>' +
    'Pour rappel, la candidature est éditable à ce lien.' +
    '<p>Si tu as la moindre question, n\'hésites pas à nous contacter à contact@etudiant-entrepreneur.beta.gouv.fr</p>')
}

const pepites = [
  { id: '1', name: 'ETENA', email: 'ehsebti@unistra.fr' },
  { id: '9', name: 'Bretagne', email: 'pepite-bretagne@u-bretagneloire.fr' },
  { id: '13', name: '3EF', email: 'pepite3ef@univ-paris-est.fr' },
  { id: '14', name: 'heSam Entreprendre', email: 'coproj.pepite@hesam.eu' },
  { id: '15', name: 'Paris Ouest Nord', email: 'contact@pepite-pon.fr' },
  { id: '22', name: 'Picardie', email: 'pepite.picardie@gmail.com' },
]

function getPepite(id) {
  const pepite = pepites.find(p => { return (p.id == id) })
  if (!pepite) {
    throw new Error(`Le PEPITE avec l\'id: ${id} n'existe pas`)
  }
  return pepite
}

module.exports = ApplicationController
