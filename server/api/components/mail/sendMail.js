const config = require('../../config').mail
const nodemailer = require('nodemailer')
const sgTransport = require('nodemailer-sendgrid-transport')

exports.sendMail = function(email, done) {
  const options = {
    auth: {
      api_key: config.apiKey
    }
  }
  const mailer = nodemailer.createTransport(sgTransport(options))

  mailer.sendMail(email, done)
}
