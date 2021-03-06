const Moment = require('moment')

function getMail(sender, application, pepite, nextCommittee) {
  return {
    from: sender,
    to: application.contact.email,
    replyTo: pepite.email,
    subject: 'Transfert de ta candidature au statut Étudiant-entrepreneur',
    html: getSendEmailBody(application, pepite, nextCommittee)
  }
}

function getSendEmailBody(application, pepite, nextCommittee) {
  const applicationlink = `https://etudiant-entrepreneur.beta.gouv.fr/application/${application._id}`
  return ('<html><body><p>Bonjour,</p>' +
    `<p>Ta candidature a été transférée au PEPITE ${pepite.name} qui reviendra vers toi pour les prochaines étapes.</p>` +
    `<p>Ta candidature passera en comité d'engagement, ${getCommitteeMessage(nextCommittee)}</p>` +
    `<p><a href="${applicationlink}">${applicationlink}<a></p>` +
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
