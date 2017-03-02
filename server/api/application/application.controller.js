'use strict'

const Application = require('./application.model')
const Pepite = require('../pepite/pepite.model')
const StandardError = require('standard-error')
const mongoose = require('mongoose')
const sendMail = require('../components/mail/send-mail').sendMail
const json2csv = require('json2csv')
const applicationExportFields = require('./applicationExportFields')
const certificatePdf = require('../components/pdf/certificatePdf')

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
          (error, info) => { logMail(req.log, error, info) })
        return res.status(201).json(application)
      })
      .catch((err) => {
        req.log.error(err)
        if (err.name == 'ValidationError') {
          return next(new StandardError('La page \'Mes informations\' doit être correctement remplie', { code: 400 }))
        }
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
        if (!application) {
          return res.sendStatus(404)
        }
        if (application.status == 'sent') {
          return next(new StandardError('Tu as déjà soumis ta candidature', { code: 400 }))
        }
        req.body.status = 'sent'
        req.body.sentDate = new Date()
        return Application
          .findByIdAndUpdate(req.params.id, req.body, { new: true })
          .then((application) => {
            return Pepite.findById(application.pepite.pepite)
              .then((pepite) => {
                if (!pepite) {
                  return next(new StandardError(`Le PEPITE avec l\'id: ${application.pepite.pepite} n'existe pas`, { code: 500 }))
                }
                //notify applicant
                sendMail(
                  application.contact.email,
                  'Confirmation d\'envoi de ta candidature au statut Étudiant-entrepreneur',
                  getSendEmailBody(application, pepite),
                  (error, info) => { logMail(req.log, error, info) })
                //notify tutuor
                if (application.contact.situation == 'student') {
                  sendMail(
                    application.career.tutor.email,
                    'Candidature d\'un de vos étudiants au statut Étudiant-entrepreneur',
                    getTutorEmailBody(application, pepite),
                    (error, info) => { logMail(req.log, error, info) })
                }
                //notify pepite
                sendMail(
                  pepite.email,
                  `Nouvelle candidature de ${application.contact.firstname} ${application.contact.name}`,
                  getPepiteEmailBody(application),
                  (error, info) => { logMail(req.log, error, info) })
                //notify partners
                notifyPartners(application, pepite, req, (error, info) => { logMail(req.log, error, info) })
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
      })
      .catch((err) => {
        req.log.error(err)
        return res.status(500).send(err)
      })
  }

  getPepiteApplications(req, res) {
    return Application
      .find({ 'pepite.pepite': req.params.id }).exec()
      .then((applications) => {
        return res.json(applications)
      })
      .catch((err) => {
        req.log.error(err)
        return res.status(500).send(err)
      })
  }

  getPepiteApplicationsXls(req, res) {
    return Application
      .find({ 'pepite.pepite': req.params.id }).exec()
      .then((applications) => {
        var filename = 'data.csv'
        res.attachment(filename)
        return res.end(json2csv({ data: applications, fields: applicationExportFields, del: '\t' }))
      })
      .catch((err) => {
        req.log.error(err)
        return res.status(500).send(err)
      })
  }

  getApplicationCertificate(req, res, next) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.sendStatus(404)
    }
    return Application
      .findById(req.params.id)
      .then((application) => {
        if (!application) {
          return res.sendStatus(404)
        }
        return Pepite.findById(application.pepite.pepite)
          .then((pepite) => {
            if (!pepite) {
              return next(new StandardError(`Le PEPITE avec l\'id: ${application.pepite.pepite} n'existe pas`, { code: 500 }))
            }
            var filename = `SNEE_attestation_${application.contact.firstname}_${application.contact.name}.pdf`
            res.attachment(filename)
            certificatePdf.generate(application, pepite, res)
            return res
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

function notifyPartners(application, pepite, req, done) {
  application.project.team.forEach((teamMember) => {
    Application.count({ 'contact.email': teamMember.email }, (err, c) => {
      if (!c) {
        sendMail(
          teamMember.email,
          'Candidature au statut Etudiant Entrepreneur',
          getPartnerInviteEmailBody(application, pepite),
          done)
      }
    })
  })
}

function getSaveEmailBody(application) {
  return ('<html><body><p>Bonjour,</p>' +
    '<p>Tu as commencé ta candidature sur etudiant-entrepreneur.beta.gouv.fr</p>' +
    '<p>Tu peux finaliser ta demande quand tu veux à cette adresse :</p>' +
    '<a href="https://etudiant-entrepreneur.beta.gouv.fr/application/' + application._id + '" target="_blank">ta candidature</a>' +
    '<p>Si tu as la moindre question, n\'hésites pas à nous contacter à contact@etudiant-entrepreneur.beta.gouv.fr</p>')
}

function getPartnerInviteEmailBody(application, pepite) {
  return ('<html><body><p>Bonjour,</p>' +
    `<p>${application.contact.firstname} ${application.contact.name} a candidaté au <a target="_blank" href="http://www.enseignementsup-recherche.gouv.fr/cid79926/statut-national-etudiant-entrepreneur.html">status étudiant-entrepreneur</a> auprès du <a target="_blank" href="http://www.enseignementsup-recherche.gouv.fr/cid79223/pepite-poles-etudiants-pour-innovation-transfert-entrepreneuriat.html"><abbr title="Pôles Étudiants Pour l'Innovation, le Transfert et l'Entrepreneuriat">PEPITE</abbr></a> ${pepite.name} et t'a déclaré comme associé·e</p>` +
    '<p>Si tu n\'as pas déjà déposé ta candidature, tu peux également le faire à cette adresse: etudiant-entrepreneur.beta.gouv.fr</p>' +
    '<p>Bonne journée.</p>')
}

function getSendEmailBody(application, pepite) {
  var tutorInformed = ''
  if (application.contact.situation == 'student') {
    tutorInformed = '<p>Ton responsable pédagogique a été informé·e de ta candidature au statut, nous t’invitons à prendre contact avec lui.</p>'
  }
  return ('<html><body><p>Bonjour,</p>' +
    `<p>Ta candidature a bien été envoyée au PEPITE ${pepite.name} qui reviendra vers toi pour les prochaines étapes.</p>` +
    '<p>Ta  candidature passera en comité d\'engagement, la date de ce comité te sera donnée par ton PEPITE.</p>' +
    tutorInformed +
    '<a href="https://etudiant-entrepreneur.beta.gouv.fr/application/' + application._id + '" target="_blank">ta candidature</a>' +
    `<p>Ton PEPITE va prendre contact avec toi dans les prochains jours, si tu as des questions sur la suite du processus tu peux le contacter à ${pepite.email}</p>` +
    '<p>Si tu as des questions sur la plateforme n\'hésites pas à nous contacter à contact@etudiant-entrepreneur.beta.gouv.fr</p>' +
    '<p>Bonne aventure entreprenariale !</p>')
}

function getPepiteEmailBody(application) {
  return ('<html><body><p>Bonjour,</p>' +
    `<p>Vous avez reçu une nouvelle candidature de la part de ${application.contact.firstname} ${application.contact.name}.</p>` +
    '<p>Vous retrouverez le dossier complet à l\'adresse :</p>' +
    '<a href="https://etudiant-entrepreneur.beta.gouv.fr/application/' + application._id + '" target="_blank">candidature</a>' +
    '<p>Pour rappel, la candidature est éditable à ce lien.</p>' +
    '<p>Si vous avez la moindre question, n\'hésitez pas à nous contacter à contact@etudiant-entrepreneur.beta.gouv.fr</p>')
}

function getTutorEmailBody(application, pepite) {
  return ('<html><body><p>Madame,Monsieur,</p>' +
    '<br>' +
    `<p>L'étudiant·e ${application.contact.firstname} ${application.contact.name} demande le statut national étudiant·e entrepreneur·e (SNEE) auprès du PEPITE ${pepite.name}</p>` +
    '<p>Nous vous informons de sa démarche en tant que référent.e pédagogique car l’obtention de ce statut a pour objet de rendre compatible études et projet d\'activités en proposant notamment des aménagements d\'emploi du temps, des crédits ECTS et la possibilité de substituer au stage le travail sur son projet.</p>' +
    '<p>Il est dès lors important que les équipes pédagogiques puissent être informées le plus en amont possible et puissent être actrices dans ce processus.</p>' +
    '<p>Le/la candidat·e a été informé·e que vous êtiez notifié·e de sa demande et est invité·e à prendre contact avec vous.</p>' +
    `<p>Son PEPITE est contactable à l\'adresse suivante: ${pepite.email}</p>` +
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

module.exports = ApplicationController
