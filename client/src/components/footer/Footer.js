import React from 'react'

const Footer = (props) => {
  return(
    <footer>
      <div className="row">
        <div className="col-lg-12">
          <ul className="list-unstyled">
              <li><a href="http://www.enseignementsup-recherche.gouv.fr/pid32602/faq-sur-statut-etudiant-entrepreneur-d2e.html" target="_blank">FAQ du statut</a></li>
              <li><a href="http://www.pepite-france.fr" target="_blank">PEPITE France</a></li>
              <li><a href="mailto:contact@etudiant-entrepreneur.beta.gouv.fr">Nous contacter</a></li>
              <li><a href="https://github.com/sgmap/etudiant-entrepreneur" target="_blank">GitHub</a></li>
            </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
