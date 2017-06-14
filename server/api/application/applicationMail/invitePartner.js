function getMail(sender, application, pepite, partnerMail) {
  return {
    from: sender,
    to: partnerMail,
    replyTo: pepite.email,
    subject: 'Candidature au statut Etudiant Entrepreneur',
    html: getPartnerInviteEmailBody(application, pepite)
  }
}

function getPartnerInviteEmailBody(application, pepite) {
  return ('<html><body><p>Bonjour,</p>' +
    `<p>${application.contact.firstname} ${application.contact.name} a candidaté au <a target="_blank" href="http://www.enseignementsup-recherche.gouv.fr/cid79926/statut-national-etudiant-entrepreneur.html">statut étudiant-entrepreneur</a> auprès du <a target="_blank" href="http://www.enseignementsup-recherche.gouv.fr/cid79223/pepite-poles-etudiants-pour-innovation-transfert-entrepreneuriat.html"><abbr title="Pôles Étudiants Pour l'Innovation, le Transfert et l'Entrepreneuriat">PEPITE</abbr></a> ${pepite.name} et t'a déclaré comme associé·e</p>` +
    '<p>Si tu n\'as pas déjà déposé ta candidature, tu peux également le faire à cette adresse: etudiant-entrepreneur.beta.gouv.fr</p>' +
    '<p>Bonne journée.</p>' +
    '</body></html>')
}

module.exports = getMail
