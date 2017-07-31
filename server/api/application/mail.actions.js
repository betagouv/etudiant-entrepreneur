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

  notifyPepiteNew(application, pepiteNew, pepiteOld, logCallback) {
    this.sendMail(applicationMail.notifyPepiteNew(senderMail, application, pepiteNew, pepiteOld), logCallback)
  }

  notifyPepiteOld(application, pepiteNew, pepiteOld, logCallback)  {
    this.sendMail(applicationMail.notifyPepiteOld(senderMail, application, pepiteNew, pepiteOld), logCallback)
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

  transferApplication(application, pepite, nextCommittee, logCallback) {
    this.sendMail(applicationMail.transferApplication(senderMail, application, pepite, nextCommittee), logCallback)
  }
}

module.exports = MailActions
