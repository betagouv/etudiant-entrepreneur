import React from 'react'
import {Link} from 'react-router'
import Footer from '../footer/Footer.js'
import BetaTestersPanel from '../common/BetaTestersPanel'

class HomePage extends React.Component {
  componentDidMount() { }
  render() {
    return (
      <div className="container">
        <div className="header-content">
          <h1>Deviens Etudiant·e Entrepreneur·e</h1>
          <hr/>
          <p className="header-sub-content">Tu as un projet ? Pour être aidé·e et accompagné·e, rejoins la communauté.</p>
          <Link to="application" className="btn btn-primary btn-lg">Demande le statut</Link>
        </div>
        <BetaTestersPanel/>
        <Footer/>
      </div>
    )
  }
}

export default HomePage
