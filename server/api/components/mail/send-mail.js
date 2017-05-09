const config = require('../../config').sendGrid
const nodemailer = require('nodemailer')
const sgTransport = require('nodemailer-sendgrid-transport')

exports.sendMail = function(to, subject, body, done) {
  const options = {
    auth: {
      api_key: config.apiKey
    }
  }

  const mailer = nodemailer.createTransport(sgTransport(options))

  const email = {
    from: 'contact@etudiant-entrepreneur.beta.gouv.fr',
    to: to,
    replyto: 'contact@etudiant-entrepreneur.beta.gouv.fr',
    subject: subject,
    html: body
  }

  mailer.sendMail(email, done)
}
