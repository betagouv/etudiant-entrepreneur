function getMail(sender, application) {
  return {
    from: sender,
    to: application.contact.email,
    replyTo: sender,
    subject: 'Sauvegarde de ta candidature au statut Étudiant entrepreneur',
    html: getSaveEmailBody(application)
  }
}

function getSaveEmailBody(application) {
  const applicationlink = `https://etudiant-entrepreneur.beta.gouv.fr/application/${application._id}`
  return ('<html><body><p>Bonjour,</p>' +
    '<p>Tu as commencé ta candidature sur etudiant-entrepreneur.beta.gouv.fr</p>' +
    '<p>Tu peux finaliser ta demande quand tu veux à cette adresse :</p>' +
    `<p><a href="${applicationlink}">${applicationlink}<a></p>` +
    '<p>Si tu as la moindre question, n\'hésites pas à nous contacter à contact@etudiant-entrepreneur.beta.gouv.fr</p>' +
    '</body></html>')
}

module.exports = getMail
