'use strict'

const StandardError = require('standard-error')
const mongoose = require('mongoose')
const json2csv = require('json2csv')

const Application = require('./application.model')
const Committee = require('../committee/committee.model')
const Pepite = require('../pepite/pepite.model')
const MailActions = require('./mail.actions')
const applicationExportFields = require('./applicationExportFields')
const certificatePdf = require('../components/pdf/certificatePdf')

class ApplicationController {
  constructor(options) {
    this.mailActions = new MailActions(options.mailer)
    this.createApplication = this.createApplication.bind(this)
    this.sendApplication = this.sendApplication.bind(this)
    this.updateApplication = this.updateApplication.bind(this)
  }

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

  getFilteredApplication(req, res, next) {
    const filter = req.query.filter ? req.query.filter : {}
    const page = Math.max(0, req.query.page - 1)
    const findFilter = getFindQuery(filter)

    return Promise.all([
      Application.find(findFilter).count(),
      Application.find(findFilter)
        .sort({ sentDate: -1 })
        .skip(10 * page)
        .limit(10)
    ])
      .then((pagination) => {
        const count = pagination[0]
        const applications = pagination[1]
        if (count && !applications.length) {
          return next(new StandardError('Request range not allowed', { code: 400 }))
        }
        res.set({
          'Content-Range': pagination[0]
        })
        return res.json(pagination[1])
      })
      .catch((err) => {
        req.log.error(err)
        return res.status(500).send(err)
      })
  }

  createApplication(req, res, next) {
    Application.create(req.body)
      .then((application) => {
        this.mailActions.saveApplication(
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

  updateApplication(req, res, next) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.sendStatus(404)
    }
    return Pepite.findById(req.body.pepite.pepite)
      .then((pepiteNew) => {
        if (!pepiteNew) {
          return next(new StandardError(`Le PEPITE avec l\'id: ${req.body.pepite.pepite} n'existe pas`, { code: 400 }))
        }
        return Application
          .findById(req.params.id)
          .then((oldApplication) => {
            if (!oldApplication) {
              return res.sendStatus(404)
            }
            return Application
              .findByIdAndUpdate(req.params.id, req.body, { new: true })
              .then((application) => {
                return Pepite.findById(oldApplication.pepite.pepite).then((pepiteOld) => {
                  this.notifyPepiteTransfer(application, pepiteNew, pepiteOld, req)
                  return res.json(application)
                })
              })
          })
      })
      .catch((err) => {
        req.log.error(err)
        return res.status(500).send(err)
      })
  }

  notifyPepiteTransfer(application, pepiteNew, pepiteOld, req) {
    return new Promise((fulfill) => {
      if (application.status == 'sent' && pepiteNew._id != pepiteOld._id) {
        this.mailActions.notifyPepiteNew(
          application,
          pepiteNew,
          pepiteOld,
          (error, info) => { logMail(req.log, error, info) })
        this.mailActions.notifyPepiteOld(
          application,
          pepiteNew,
          pepiteOld,
          (error, info) => { logMail(req.log, error, info) })
        return Committee.getNextCommittee(pepiteNew._id)
          .then((nextCommittee) => {
            return this.mailActions.transferApplication(
              application,
              pepiteNew,
              nextCommittee,
              (error, info) => { logMail(req.log, error, info) })
          })
      }
      fulfill()
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
                    this.mailActions.sendApplication(
                      application,
                      pepite,
                      nextCommittee,
                      (error, info) => { logMail(req.log, error, info) })
                    //notify tutuor
                    if (application.contact.situation == 'student') {
                      this.mailActions.notifyTutor(
                        application,
                        pepite,
                        (error, info) => { logMail(req.log, error, info) })
                    }
                    //notify pepite
                    this.mailActions.notifyPepite(
                      application,
                      pepite,
                      (error, info) => { logMail(req.log, error, info) }
                    )
                    //notify partners
                    Application.getUnregisteredTeamMembers(application.project.team).then((unregisteredTeamMembers) => {
                      this.mailActions.invitePartners(
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

  getOtherApplication(req, res) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.sendStatus(400)
    }
    return Application
      .getOtherApplication(req.params.id)
      .then((otherApplications) => {
        if (!otherApplications) {
          return res.sendStatus(404)
        }
        return res.json(otherApplications)
      })
      .catch((err) => {
        req.log.error(err)
        return res.status(500).send(err)
      })
  }
}

function getFindQuery(flatFilter) {
  let findFilter = {}

  if (flatFilter.email) {
    findFilter['contact.email'] = {
      $regex: `${flatFilter.email}`,
      $options: 'i'
    }
  }
  if (flatFilter.name) {
    findFilter['contact.name'] = {
      $regex: `${flatFilter.name}`,
      $options: 'i'
    }
  }
  if (flatFilter.pepite) {
    findFilter['pepite.pepite'] = flatFilter.pepite
  }
  if (flatFilter.status) {
    findFilter['status'] = flatFilter.status
  }
  if (flatFilter.establishment) {
    findFilter['career.diploma.establishment'] = {
      $regex: `${flatFilter.establishment}`,
      $options: 'i'
    }
  }

  return findFilter
}

function logMail(logger, error, info) {
  if (error) {
    logger.error('Notification error: ' + error)
  } else {
    logger.info('Notification sent: ', info)
  }
}

module.exports = ApplicationController
