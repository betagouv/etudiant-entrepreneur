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
          <Link to="pepite/applicant">
            <Card title="Mes Candidats" glyphicon="glyphicon glyphicon-envelope" />
          </Link>
        </div>
      </div>
    )
  }
}

export default PepiteHomePage
