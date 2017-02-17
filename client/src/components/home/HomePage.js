import React from 'react'
import { Link } from 'react-router'
import Footer from '../footer/Footer.js'
import BetaTestersPanel from '../common/BetaTestersPanel'
import { getCurrentUniversityYear } from '../common/yearHelper'

class HomePage extends React.Component {
  componentDidMount() { }
  render() {
    return (
      <div className="container fill vertical-align">
          <div className="header-content fill vertical-align">
            <h1>Deviens Etudiant·e Entrepreneur·e</h1>
            <hr />
            <p className="header-sub-content">Tu as un projet ? Pour être aidé·e et accompagné·e, rejoins la communauté.</p>
            <Link to="application" className="btn btn-primary btn-lg">Demande le statut pour {getCurrentUniversityYear()}</Link>
          </div>
        <Footer className="footer"/>
      </div>
    )
  }
}

export default HomePage
