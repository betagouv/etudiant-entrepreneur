import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import './Footer.css'

const Footer = (props) => {
  return (
    <section id="footer">
      <div className="container">
        <footer>
          <div className="row">
            <div className="col-lg-12">
              <ul className="list-unstyled">
                <li><a href="http://www.enseignementsup-recherche.gouv.fr/pid32602/faq-sur-statut-etudiant-entrepreneur-d2e.html" target="_blank">FAQ du statut</a></li>
                <li><a href="http://www.pepite-france.fr" target="_blank">PEPITE France</a></li>
                <li><a href="mailto:contact@etudiant-entrepreneur.beta.gouv.fr">Nous contacter</a></li>
                <li>
                  <LinkContainer to="/cgu">
                    <a>CGU</a>
                  </LinkContainer>
                </li>
                <li><a href="https://github.com/sgmap/etudiant-entrepreneur" target="_blank">GitHub</a></li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </section>
  )
}

export default Footer
