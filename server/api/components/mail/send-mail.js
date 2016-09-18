'use strict'

const config = require('../../config').sendGrid
const sendgrid  = require('sendgrid')(config.apiKey)

exports.sendMail = function(to, subject, body, done) {

  const email = new sendgrid.Email({
    from: 'contact@etudiant-entrepreneur.beta.gouv.fr',
    to: to,
    replyto: 'contact@etudiant-entrepreneur.beta.gouv.fr',
    subject: subject,
    html: body
  })

  sendgrid.send(email, done)
}
