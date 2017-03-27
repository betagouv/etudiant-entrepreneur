import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import Card from './Card'

export class PepiteHomePage extends React.Component {
  constructor(props, context) {
    super(props, context)
  }
  render() {
    return (
      <div className="container back-content">
        <div className="row">
          <Link className="col-md-6" to="pepite/applicant">
            <Card title="Mes Candidats" glyphicon="glyphicon glyphicon-envelope" />
          </Link>
          <div className="col-md-6" title="bientôt disponible">
            <Card title="Ma promotion" glyphicon="glyphicon glyphicon-education" isDisabled />
          </div>
          <div className="col-md-6" title="bientôt disponible">
            <Card title="Mon Compte" glyphicon="glyphicon glyphicon-cog" isDisabled />
          </div>
          <div className="col-md-6" title="bientôt disponible">
            <Card title="Mes prochains comités" glyphicon="glyphicon glyphicon-calendar" isDisabled />
          </div>
          <div className="col-md-6" title="bientôt disponible">
            <Card title="Stats" glyphicon="glyphicon glyphicon-stats" isDisabled />
          </div>
        </div>
      </div>
    )
  }
}

export default PepiteHomePage
