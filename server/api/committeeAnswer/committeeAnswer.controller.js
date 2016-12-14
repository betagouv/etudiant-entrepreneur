'use strict'

const CommitteeAnswer = require('./committeeAnswer.model')
const StandardError = require('standard-error')
const mongoose = require('mongoose')


class CommitteeAnswerController {
  ping(req, res) {
    res.json('pong')
  }

  updateAnswer(req, res, next) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return next(new StandardError('Identifiant de candidature invalide', { code: 400 }))
    }
    return CommitteeAnswer
      .findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true }).exec()
      .then((committeeAnswer) => {
        if (!committeeAnswer) {
          return res.sendStatus(404)
        }
        return res.json(committeeAnswer)
      })
      .catch((err) => {
        req.log.error(err)
        if (err.name == 'ValidationError') {
          return next(new StandardError('L\'avis du comité d\engagement l\'approbation du D2E doivent être renseignés', { code: 400 }))
        }
        return res.status(500).send(err)
      })
  }
}

module.exports = CommitteeAnswerController
