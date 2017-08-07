function getMail(sender, application, pepiteNew, pepiteOld) {
  return {
    from: sender,
    to: pepiteOld.email,
    replyTo: sender,
    subject: `Candidature de ${application.contact.firstname} ${application.contact.name} transférée`,
    html: getPepiteEmailBody(application, pepiteNew)
  }
}

function getPepiteEmailBody(application, pepiteNew) {
  const applicationlink = `https://etudiant-entrepreneur.beta.gouv.fr/application/${application._id}`
  return ('<html><body><p>Bonjour,</p>' +
    `<p>La candidature de ${application.contact.firstname} ${application.contact.name} a été transférée au PEPITE ${pepiteNew.name}</p>` +
    '<p>Vous ne la retrouverez plus sur <a href="https://etudiant-entrepreneur.beta.gouv.fr/pepite" target="_blank">votre espace PEPITE</a></p>' +
    '<p>Vous retrouverez le dossier complet à l\'adresse :</p>' +
    `<p><a href="${applicationlink}">${applicationlink}<a></p>` +
    '<p>Pour rappel, la candidature est éditable à ce lien.</p>' +
    `<p>Si vous avez des questions sur l\'origine du transfert, merci de contacter le candidat (${application.contact.email}) ou son nouveau PEPITE (${pepiteNew.email})</p>` +
    '</body></html>')
}

module.exports = getMail
