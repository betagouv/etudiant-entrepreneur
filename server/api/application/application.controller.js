'use strict'

const StandardError = require('standard-error')
const mongoose = require('mongoose')
const json2csv = require('json2csv')

const Application = require('./application.model')
const Committee = require('../committee/committee.model')
const Pepite = require('../pepite/pepite.model')
const mailActions = require('./mail.actions')
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
        mailActions.saveApplication(
          application,
          (error, info) => { logMail(req.log, error, info) }
        )
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
                return Committee.getNextCommittee(pepite._id)
                  .then((nextCommittee) => {
                    mailActions.sendApplication(
                      application,
                      pepite,
                      nextCommittee,
                      (error, info) => { logMail(req.log, error, info) })
                    //notify tutuor
                    if (application.contact.situation == 'student') {
                      mailActions.notifyTutor(
                        application,
                        pepite,
                        (error, info) => { logMail(req.log, error, info) })
                    }
                    //notify pepite
                    mailActions.notifyPepite(
                      application,
                      pepite,
                      (error, info) => { logMail(req.log, error, info) }
                    )
                    //notify partners
                    Application.getUnregisteredTeamMembers(application.project.team).then((unregisteredTeamMembers) => {
                      mailActions.invitePartners(
                        unregisteredTeamMembers,
                        application,
                        pepite,
                        (error, info) => { logMail(req.log, error, info) })
                    })
                    return res.json(application)
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
      })
      .catch((err) => {
        req.log.error(err)
        return res.status(500).send(err)
      })
  }

  getPepiteApplications(req, res) {
    return Application
      .find({ 'pepite.pepite': req.params.id }).sort({ 'sentDate': 1 }).exec()
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
      .find({ 'pepite.pepite': req.params.id, 'status': { $in: ['sent', 'accepted', 'refused'] } }).exec()
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

module.exports = ApplicationController
