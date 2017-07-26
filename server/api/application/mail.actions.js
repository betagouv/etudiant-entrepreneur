const sendMail = require('../components/mail/sendMail').sendMail
const senderMail = require('../config').mail.senderMail

const applicationMail = require('./applicationMail')

class MailActions {
  constructor(nodemailer) {
    this.sendMail = sendMail(nodemailer)
  }

  invitePartners(teamMembers, application, pepite, logCallback) {
    teamMembers.forEach((teamMember) => {
      this.sendMail(applicationMail.invitePartner(senderMail, application, pepite, teamMember.email), logCallback)
    })
  }

  notifyPepite(application, pepite, logCallback) {
    this.sendMail(applicationMail.notifyPepite(senderMail, application, pepite), logCallback)
  }

  notifyTutor(application, pepite, logCallback) {
    this.sendMail(applicationMail.notifyTutor(senderMail, application, pepite), logCallback)
  }

  saveApplication(application, logCallback) {
    this.sendMail(applicationMail.saveApplication(senderMail, application), logCallback)
  }

  sendApplication(application, pepite, nextCommittee, logCallback) {
    this.sendMail(applicationMail.sendApplication(senderMail, application, pepite, nextCommittee), logCallback)
  }
}

module.exports = MailActions
