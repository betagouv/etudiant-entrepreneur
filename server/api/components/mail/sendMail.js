const config = require('../../config').mail
const nodemailer = require('nodemailer')
const sgTransport = require('nodemailer-sendgrid-transport')

exports.sendMail = function (email, done) {
  let transport
  if (process.env.NODE_ENV === 'production') {
    transport = sgTransport({
      auth: {
        api_key: config.apiKey
      }
    })
  } else {
    transport = {
      host: 'debugmail.io',
      port: 25,
      auth: {
        user: process.env.DEV_MAIL_USER || '',
        pass: process.env.DEV_MAIL_PASS || ''
      }
    }
  }

  const mailer = nodemailer.createTransport(transport)

  mailer.sendMail(email, done)
}
