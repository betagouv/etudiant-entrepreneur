function getMail(sender, application, pepiteNew, pepiteOld) {
  return {
    from: sender,
    to: pepiteNew.email,
    replyTo: sender,
    subject: `Nouvelle candidature de ${application.contact.firstname} ${application.contact.name} transférée`,
    html: getPepiteEmailBody(application, pepiteOld)
  }
}

function getPepiteEmailBody(application, pepiteOld) {
  return ('<html><body><p>Bonjour,</p>' +
    `<p>La candidature de ${application.contact.firstname} ${application.contact.name} vous a été nouvellement transférée</p>` +
    `<p>Elle était précédemment adressée au PEPITE ${pepiteOld.name}</p>` +
    '<p>Vous retrouverez le dossier complet à l\'adresse :</p>' +
    '<a href="https://etudiant-entrepreneur.beta.gouv.fr/application/' + application._id + '" target="_blank">candidature</a>' +
    '<p>Pour rappel, la candidature est éditable à ce lien.</p>' +
    `<p>Si vous avez des questions sur l\'origine du transfert, merci de contacter le candidat (${application.contact.email}) ou son précédent PEPITE (${pepiteOld.email})</p>` +
    '</body></html>')
}

module.exports = getMail
