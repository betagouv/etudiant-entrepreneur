import React from 'react'
import { Link } from 'react-router'
import Footer from '../footer/Footer.js'
import BetaTestersPanel from '../common/BetaTestersPanel'

class HomePage extends React.Component {
  componentDidMount() { }
  render() {
    return (
      <div className="container fill vertical-align">
          <div className="header-content fill vertical-align">
            <h1>Deviens Etudiant·e Entrepreneur·e</h1>
            <hr />
            <p className="header-sub-content">Tu as un projet ? Pour être aidé·e et accompagné·e, rejoins la communauté.</p>
            <Link to="application" className="btn btn-primary btn-lg">Demande le statut</Link>
          </div>
          <iframe src="https://data.enseignementsup-recherche.gouv.fr/explore/embed/dataset/fr-esr-institutions-partenaires-des-poles-etudiants-pour-linnovation-le-transfer/map/?location=5,46.64944,3.44971&basemap=jawg.streets&static=true&datasetcard=true" width="400" height="300" frameborder="0"></iframe>
        <Footer className="footer"/>
      </div>
    )
  }
}

export default HomePage
