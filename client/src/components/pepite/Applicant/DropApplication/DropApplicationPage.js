import React, { PropTypes } from 'react'
import toastr from 'toastr'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import DropApplicationForm from './DropApplicationForm'
import * as applicationActions from '../../../../actions/applicationActions'

class DropApplicationPage extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      reason: '',
      errors: ''
    }
    this.updateReason = this.updateReason.bind(this)
    this.dropApplication = this.dropApplication.bind(this)
  }

  componentDidMount() {
    if (this.props.applicationId) {
      this.props.actions.loadApplication(this.props.applicationId).catch((err) => {
        toastr.error(err)
      })
    }
  }

  updateReason(event) {
    const reason = event.target.value
    this.setState({
      reason
    })
  }

  dropApplication(event) {
    event.preventDefault()
    const reason = this.state.reason
    if (reason || reason.length || reason.trim()) {
      this.props.actions.dropApplication(this.props.applicationId, reason).then(() => {
        toastr.success(`Candidature de ${this.props.applicantFullname} abandonnée`)
        this.context.router.push('/pepite/applicant')
      })
        .catch((err) => {
          toastr.error(err)
        })
    } else {
      this.setState({
        error: 'obligatoire'
      })
    }
  }

  render() {
    return (
      <div className="container back-content">
        <div className="page-header">
          <h1>Abandonner la candidature de {this.props.applicantFullname}</h1>
        </div>
        <DropApplicationForm
          committeeAnswer={this.state.committeeAnswer}
          onChange={this.updateReason}
          errors={this.state.errors}
          dropApplication={this.dropApplication} />
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    applicationId: ownProps.params.id,
    applicantFullname: `${state.contact.firstname} ${state.contact.name}`
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(applicationActions, dispatch),
  }
}

DropApplicationPage.propTypes = {
  actions: PropTypes.object.isRequired,
  applicantFullname: PropTypes.string.isRequired,
  applicationId: PropTypes.string
}

DropApplicationPage.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(DropApplicationPage)
