function getMail(sender, application, pepite) {
  return {
    from: sender,
    to: pepite.email,
    replyTo: sender,
    subject: `Nouvelle candidature de ${application.contact.firstname} ${application.contact.name}`,
    html: getPepiteEmailBody(application)
  }
}

function getPepiteEmailBody(application) {
  return ('<html><body><p>Bonjour,</p>' +
    `<p>Vous avez reçu une nouvelle candidature de la part de ${application.contact.firstname} ${application.contact.name}.</p>` +
    '<p>Vous retrouverez le dossier complet à l\'adresse :</p>' +
    '<a href="https://etudiant-entrepreneur.beta.gouv.fr/application/' + application._id + '" target="_blank">candidature</a>' +
    '<p>Pour rappel, la candidature est éditable à ce lien.</p>' +
    '<p>Si vous avez la moindre question, n\'hésitez pas à nous contacter à contact@etudiant-entrepreneur.beta.gouv.fr</p>' +
    '</body></html>')
}

module.exports = getMail
