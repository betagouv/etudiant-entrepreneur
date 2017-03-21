import React from 'react'
import { Link } from 'react-router'
import Footer from '../footer/Footer.js'
import NextSteps from './NextSteps'
import { getCurrentUniversityYear } from '../common/yearHelper'
import './HomePage.css'

class HomePage extends React.Component {
  componentDidMount() { }
  render() {
    return (
      <div className>
        <div className="header-content vertical-align">
          <div className="col-lg-12">
            <h1>Deviens Etudiant·e Entrepreneur·e</h1>
            <hr />
            <p className="header-sub-content">Tu as un projet ? Pour être aidé·e et accompagné·e, rejoins la communauté.</p>
            <Link to="application" className="btn btn-success btn-lg">Demande le statut pour {getCurrentUniversityYear()}</Link>
          </div>
        </div >
        <NextSteps/>
        <Footer className="footer" />
      </div >
    )
  }
}

export default HomePage
