const Moment = require('moment')

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
  const applicationlink = `https://etudiant-entrepreneur.beta.gouv.fr/application/${application._id}`
  Moment.locale('fr')
  return ('<html><body><p>Bonjour,</p>' +
    `<p>La candidature de ${application.contact.firstname} ${application.contact.name} vous a été nouvellement transférée</p>` +
    `<p>Elle a été envoyée il y a ${new Moment().utc(application.sentDate).fromNow(true)} et était précédemment adressée au PEPITE ${pepiteOld.name}</p>` +
    '<p>Vous retrouverez le dossier complet à l\'adresse :</p>' +
    `<p><a href="${applicationlink}">${applicationlink}<a></p>` +
    '<p>Pour rappel, la candidature est éditable à ce lien.</p>' +
    `<p>Si vous avez des questions sur l\'origine du transfert, merci de contacter le candidat (${application.contact.email}) ou son précédent PEPITE (${pepiteOld.email})</p>` +
    '</body></html>')
}

module.exports = getMail
