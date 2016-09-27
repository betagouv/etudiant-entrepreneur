import React from 'react'
import {Link} from 'react-router'
import BetaTestersPanel from '../common/BetaTestersPanel'

class HomePage extends React.Component {
  componentDidMount() { }
  render() {
    return (
      <div className="jumbotron">
        <div className="header-content">
          <h1>Deviens Etudiant Entrepreneur</h1>
          <hr/>
          <p className="header-sub-content">Tu as un projet ? Pour être aidé et accompagné, rejoins la communauté.</p>
          <Link to="application" className="btn btn-primary btn-lg">Demande le statut</Link>
        </div>
        <BetaTestersPanel/>
      </div>
    )
  }
}

export default HomePage
