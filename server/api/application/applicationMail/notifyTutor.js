function getMail(sender, application, pepite) {
  return {
    from: sender,
    to: application.career.tutor.email,
    replyTo: pepite.email,
    subject: 'Candidature d\'un de vos étudiants au statut Étudiant-entrepreneur',
    html: getTutorEmailBody(application, pepite)
  }
}

function getTutorEmailBody(application, pepite) {
  return ('<html><body><p>Madame,Monsieur,</p>' +
    '<br>' +
    `<p>L'étudiant·e ${application.contact.firstname} ${application.contact.name} demande le statut national étudiant·e entrepreneur·e (SNEE) auprès du PEPITE ${pepite.name}</p>` +
    '<p>Nous vous informons de sa démarche en tant que référent.e pédagogique car l’obtention de ce statut a pour objet de rendre compatible études et projet d\'activités en proposant notamment des aménagements d\'emploi du temps, des crédits ECTS et la possibilité de substituer au stage le travail sur son projet.</p>' +
    '<p>Il est dès lors important que les équipes pédagogiques puissent être informées le plus en amont possible et puissent être actrices dans ce processus.</p>' +
    '<p>Le/la candidat·e a été informé·e que vous êtiez notifié·e de sa demande et est invité·e à prendre contact avec vous.</p>' +
    `<p>Son PEPITE est contactable à l\'adresse suivante: ${pepite.email}</p>` +
    '<p>Bien cordialement,<p>' +
    '<p>L\'équipe de la plateforme en ligne.<p>' +
    '<br>' +
    '<div style=\'font-style: italic;\'>' +
    '<p>Si vous souhaitez en savoir plus sur les PEPITE et le statut national étudiant·e entrepreneur·e, voici quelques liens utiles :</p>' +
    '<ul><li><a href="http://www.etudiant.gouv.fr/pid33854/entrepreneuriat-etudiant.html" target="_blank">Qu\'est-ce que le Statut National Étudiant Entrepreneur (SNEE)?</a></li>' +
    '<li><a href="http://www.enseignementsup-recherche.gouv.fr/cid102058/les-etudiants-entrepreneurs-optimistes-sur-leur-avenir.html" target="_blank">Pourquoi un statut national Étudiant Entrepreneur ?</a></li>' +
    '<li><a href="http://www.enseignementsup-recherche.gouv.fr/cid79223/pepite-poles-etudiants-pour-l-innovation-le-transfert-et-l-entrepreneuriat.html" target="_blank">Qui sont les PEPITE ?</a></li>' +
    '<li><a href="http://www.pepite-france.fr/" target="_blank">Qu\'est-ce que le réseau PEPITE France ?</a></li></<ul>' +
    '<li><a href="http://www.enseignementsup-recherche.gouv.fr/pid32602/faq-sur-statut-etudiant-entrepreneur-d2e.html" target="_blank">Et toutes les autres réponses à vos questions :)</a></li></<ul>' +
    '</div>' +
    '</body></html>')
}

module.exports = getMail
