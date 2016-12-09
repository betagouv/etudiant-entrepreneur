import React, { PropTypes } from 'react'
import toastr from 'toastr'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as applicationActions from '../../actions/applicationActions'
import PepiteApplicantRow from './PepiteApplicantRow'

export class PepiteHomePage extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      applications: []
    }
  }

  componentDidMount() {
    this.props.actions.getPepiteApplication()
      .then(applications => {
        this.setState({applications: [...applications]})
      })
      .catch((err) => {
        toastr.error(err)
      })
  }

  render() {
    return (
      <div className="container back-content">
        <div className="page-header">
          <h1>Vos candidats</h1>
        </div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Établissement</th>
              <th>Status</th>
              <th>Candidature</th>
            </tr>
          </thead>
          <tbody>
            {this.state.applications.map((application, i) => { return (<PepiteApplicantRow key={i} application={application} />) })}
          </tbody>
        </table>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(applicationActions, dispatch),
  }
}

PepiteHomePage.propTypes = {
  actions: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(PepiteHomePage)
