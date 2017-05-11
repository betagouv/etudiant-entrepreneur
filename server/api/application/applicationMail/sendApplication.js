const Moment = require('moment')

function getMail(sender, application, pepite, nextCommittee) {
  return {
    from: sender,
    to: application.contact.email,
    replyTo: pepite.email,
    subject: 'Confirmation d\'envoi de ta candidature au statut Étudiant-entrepreneur',
    html: getSendEmailBody(application, pepite, nextCommittee)
  }
}

function getSendEmailBody(application, pepite, nextCommittee) {
  var tutorInformed = ''
  if (application.contact.situation == 'student') {
    tutorInformed = '<p>Ton responsable pédagogique a été informé·e de ta candidature au statut, nous t’invitons à prendre contact avec lui.</p>'
  }
  return ('<html><body><p>Bonjour,</p>' +
    `<p>Ta candidature a bien été envoyée au PEPITE ${pepite.name} qui reviendra vers toi pour les prochaines étapes.</p>` +
    `<p>Ta candidature passera en comité d'engagement, ${getCommitteeMessage(nextCommittee)}</p>` +
    tutorInformed +
    '<a href="https://etudiant-entrepreneur.beta.gouv.fr/application/' + application._id + '" target="_blank">ta candidature</a>' +
    `<p>Ton PEPITE va prendre contact avec toi dans les prochains jours, si tu as des questions sur la suite du processus tu peux le contacter à ${pepite.email}</p>` +
    '<p>Si tu as des questions sur la plateforme n\'hésites pas à nous contacter à contact@etudiant-entrepreneur.beta.gouv.fr</p>' +
    '<p>Bonne aventure entreprenariale !</p>' +
    '</body></html>')
}

function getCommitteeMessage(nextCommittee) {
  if (nextCommittee) {
    return `le prochain comité d\'engagement de ton PEPITE est prévu le ${new Moment(nextCommittee.date).format('DD/MM/YYYY')}.`
  } else {
    return 'la date de ce comité te sera donnée par ton PEPITE.'
  }
}

module.exports = getMail
