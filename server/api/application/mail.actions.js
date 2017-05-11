const sendMail = require('../components/mail/sendMail').sendMail
const senderMail = require('../config').mail.senderMail

const applicationMail = require('./applicationMail')

function invitePartners(teamMembers, application, pepite, logCallback) {
  teamMembers.forEach((teamMember) => {
    sendMail(applicationMail.invitePartner(senderMail, application, pepite, teamMember.email), logCallback)
  })
}

function notifyPepite(application, pepite, logCallback) {
  sendMail(applicationMail.notifyPepite(senderMail, application, pepite), logCallback)
}

function notifyTutor(application, pepite, logCallback) {
  sendMail(applicationMail.notifyTutor(senderMail, application, pepite), logCallback)
}

function saveApplication(application, logCallback) {
  sendMail(applicationMail.saveApplication(senderMail, application), logCallback)
}

function sendApplication(application, pepite, nextCommittee, logCallback) {
  sendMail(applicationMail.sendApplication(senderMail, application, pepite, nextCommittee), logCallback)
}

module.exports = {
  invitePartners,
  notifyPepite,
  notifyTutor,
  saveApplication,
  sendApplication
}
