import React from 'react'
import {Link} from 'react-router'
import BetaTestersPanel from '../common/BetaTestersPanel'

class HomePage extends React.Component {
  componentDidMount() { }
  render() {
    return (
      <div className="jumbotron">
        <h1>Deviens Etudiant Entrepreneur</h1>
        <p>Tu as un projet ? Pour être aider et accompagner, rejoins la communauté.</p>
        <Link to="application" className="btn btn-primary btn-lg">Demandez le statut</Link>  
        <BetaTestersPanel/>
      </div>
    )
  }
}

export default HomePage
