import React from 'react'
import {Link} from 'react-router'

class HomePage extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <div className="jumbotron">
        <h1>Etudiant Entrepreneur</h1>
        <p>Le statut national d'étudiant-entrepreneur permet aux étudiant(e)s et aux jeunes diplômé(e)s d'élaborer un projet entrepreneurial dans un PEPITE. Le diplôme d'établissement "étudiant-entrepreneur" (D2E) accompagne le statut d'étudiant-entrepreneur : il permet de mener à bien son projet avec un maximum de sécurité et de visibilité.</p>
        <Link to="application" className="btn btn-primary btn-lg">Demandez le statut</Link>
      </div>
    )
  }
}

export default HomePage
