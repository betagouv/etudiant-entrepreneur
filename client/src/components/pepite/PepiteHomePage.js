import React, { PropTypes } from 'react'
import toastr from 'toastr'
import { connect } from 'react-redux'
import { Tabs, Tab } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import * as applicationActions from '../../actions/applicationActions'
import PepiteApplicantTable from './PepiteApplicantTable'

export class PepiteHomePage extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      applications: [],
      accepted: [],
      refused: []
    }
  }

  componentDidMount() {
    this.props.actions.getPepiteApplication()
      .then(applications => {
        this.setState({
          applications: [...applications.filter((a) => a.status == 'sent')],
          accepted: [...applications.filter((a) => a.status == 'accepted')],
          refused: [...applications.filter((a) => a.status == 'refused')],
        })
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
        <Tabs defaultActiveKey={1}>
          <Tab eventKey={1} title={<div>Candidats <span className="badge">{this.state.applications.length}</span></div>}>
            <PepiteApplicantTable applicants={this.state.applications} />
          </Tab>
          <Tab eventKey={2} title={<div>Acceptés <span className="badge">{this.state.accepted.length}</span></div>}>
            <PepiteApplicantTable applicants={this.state.accepted} />
          </Tab>
          <Tab eventKey={3} title={<div>Réfusés <span className="badge">{this.state.refused.length}</span></div>}>
            <PepiteApplicantTable applicants={this.state.refused} />
          </Tab>
        </Tabs>
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
