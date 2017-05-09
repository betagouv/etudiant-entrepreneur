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
  return ('<html><body><p>Bonjour,</p>' +
    '<p>Tu as commencé ta candidature sur etudiant-entrepreneur.beta.gouv.fr</p>' +
    '<p>Tu peux finaliser ta demande quand tu veux à cette adresse :</p>' +
    '<a href="https://etudiant-entrepreneur.beta.gouv.fr/application/' + application._id + '" target="_blank">ta candidature</a>' +
    '<p>Si tu as la moindre question, n\'hésites pas à nous contacter à contact@etudiant-entrepreneur.beta.gouv.fr</p>' +
    '</body></html>')
}

module.exports = getMail
