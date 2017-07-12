import React, { PropTypes } from 'react'
import { Link } from 'react-router'

export class AdminPage extends React.Component {
  constructor(props, context) {
    super(props, context)
  }
  render() {
    return (
      <div className="container back-content">
        <div className="page-header">
          <h1>Candidatures</h1>
        </div>
      </div>
    )
  }
}

export default AdminPage
