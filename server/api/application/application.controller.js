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
          (error, info) => { logMail(req.log, error, info )})
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
              (error, info) => { logMail(req.log, error, info )})
            //notify tutuor
            if (application.contact.situation == 'student') {
              sendMail(
                application.career.tutor.email,
                'Candidature d\'un de vos étudiants au statut Étudiant-entrepreneur',
                getTutorEmailBody(application),
                (error, info) => { logMail(req.log, error, info )})
            }
            //notify pepite
            sendMail(
              getPepite(application.pepite.pepite).email,
              `Nouvelle candidature de ${application.contact.firstname} ${application.contact.name}`,
              getPepiteEmailBody(application),
              (error, info) => { logMail(req.log, error, info )})
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

function logMail(logger, error, info) {
  if (error) {
    logger.error('Notification error: ' + error)
  } else {
    logger.info('Notification sent: ', info)
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
  var tutorInformed = ''
  if (application.contact.situation == 'student') {
    tutorInformed = '<p>Ton responsable pédagogique a été informé·e de ta candidature au statut, nous t’invitons à prendre contact avec lui.</p>'
  }
  return ('<html><body><p>Bonjour,</p>' +
    `<p>Ta candidature a bien été envoyée au PEPITE ${getPepite(application.pepite.pepite).name} qui reviendra vers toi pour les prochaines étapes.</p>` +
    '<p>Ta  candidature passera en comité d\'engagement, la date de ce comité te sera donnée par ton PEPITE.</p>' +
    tutorInformed +
    '<a href="https://etudiant-entrepreneur.beta.gouv.fr/application/' + application._id + '" target="_blank">ta candidature</a>' +
    '<p>Si tu as la moindre question, n\'hésites pas à nous contacter à contact@etudiant-entrepreneur.beta.gouv.fr</p>' +
    '<p>Bonne aventure entreprenariale !</p>')
}

function getPepiteEmailBody(application) {
  return ('<html><body><p>Bonjour,</p>' +
    `<p>Vous avez reçu une nouvelle candidature de la part de ${application.contact.firstname} ${application.contact.name}.</p>` +
    '<p>Vous retrouverez le dossier complet à l\'adresse :</p>' +
    '<a href="https://etudiant-entrepreneur.beta.gouv.fr/application/' + application._id + '" target="_blank">candidature</a>' +
    '<p>Pour rappel, la candidature est éditable à ce lien.</p>' +
    '<p>Si tu as la moindre question, n\'hésites pas à nous contacter à contact@etudiant-entrepreneur.beta.gouv.fr</p>')
}

function getTutorEmailBody(application) {
  return ('<html><body><p>Madame,Monsieur,</p>' +
    '<br>' +
    `<p>L'étudiant·e ${application.contact.firstname} ${application.contact.name} demande le statut national étudiant·e entrepreneur·e (SNEE)</p>` +
    '<p>Nous vous informons de sa démarche en tant que référent.e pédagogique car l’obtention de ce statut a pour objet de rendre compatible études et projet d\'activités en proposant notamment des aménagements d\'emploi du temps, des crédits ECTS et la possibilité de substituer au stage le travail sur son projet.</p>' +
    '<p>Il est dès lors important que les équipes pédagogiques puissent être informées le plus en amont possible et puissent être actrices dans ce processus.</p>' +
    '<p>Le/la candidat·e a été informé·e que vous êtiez notifié·e de sa demande et est invité·e à prendre contact avec vous.</p>' +
    '<p>Bien cordialement,<p>' +
    '<p>L\'équipe de la plateforme en ligne.<p>' +
    '<br>' +
    '<div style=\'font-style: italic;\'>' +
    '<p>Si vous souhaitez en savoir plus sur les PEPITE et le statut national étudiant·e entrepreneur·e, voici quelques liens utiles :</p>' +
    '<ul><li><a href="http://www.enseignementsup-recherche.gouv.fr/cid102058/les-etudiants-entrepreneurs-optimistes-sur-leur-avenir.html" target="_blank">Un statut qui répond à la demande sociale</a></li>' +
    '<li><a href="http://www.etudiant.gouv.fr/pid33854/entrepreneuriat-etudiant.html" target="_blank">Le SNEE</a></li>' +
    '<li><a href="http://www.enseignementsup-recherche.gouv.fr/cid79223/pepite-poles-etudiants-pour-l-innovation-le-transfert-et-l-entrepreneuriat.html" target="_blank">Les PEPITE</a></li>' +
    '<li><a href="http://www.pepite-france.fr/" target="_blank">PEPITE France</a></li></<ul>' +
    '<li><a href="http://www.enseignementsup-recherche.gouv.fr/pid32602/faq-sur-statut-etudiant-entrepreneur-d2e.html" target="_blank">FAQ</a></li></<ul>' +
    '</div>')
}

const pepites = [
  { id: '1', name: 'ETENA', email: 'a.latour@unistra.fr' },
  { id: '3', name: 'by PEEL', email: 'peel@univ-lorraine.fr' },
  { id: '4', name: 'ECA', email: 'eca@cuea.fr' },
  { id: '7', name: 'BeeLYS', email: 'beelys@fpul-lyon.org' },
  { id: '9', name: 'Bretagne', email: 'pepite-bretagne@u-bretagneloire.fr' },
  { id: '13', name: '3EF', email: 'pepite3ef@univ-paris-est.fr' },
  { id: '14', name: 'heSam Entreprendre', email: 'dossier.pepite@hesam.eu' },
  { id: '15', name: 'Paris Ouest Nord', email: 'contact@pepite-pon.fr' },
  { id: '18', name: 'PSL', email: 'psl-pepite@univ-psl.fr' },
  { id: '21', name: 'Lille Nord de France', email: 'envoi@tonpepite.com' },
  { id: '22', name: 'Picardie', email: 'pepite.picardie@gmail.com' },
  { id: '23', name: 'Vallée de Seine', email: 'mathieu.luet@normandie-univ.fr' },
  { id: '24', name: 'CRÉER', email: 'pepite.creer@u-bretagneloire.fr' },
]

function getPepite(id) {
  const pepite = pepites.find(p => { return (p.id == id) })
  if (!pepite) {
    throw new Error(`Le PEPITE avec l\'id: ${id} n'existe pas`)
  }
  return pepite
}

module.exports = ApplicationController
