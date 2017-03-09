import React, { PropTypes } from 'react'
import toastr from 'toastr'
import { connect } from 'react-redux'
import { Tabs, Tab } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import FileSaver from 'file-saver'
import * as applicationActions from '../../actions/applicationActions'
import PepiteApplicantTable from './PepiteApplicantTable'
import PepiteAcceptedApplicantTable from './PepiteAcceptedApplicantTable'

export class PepiteHomePage extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      applications: [],
      accepted: [],
      refused: []
    }
    this.getPepiteApplicationXls = this.getPepiteApplicationXls.bind(this)
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

  getPepiteApplicationXls() {
    this.props.actions.getPepiteApplicationXls().then(xlsFile => {
      FileSaver.saveAs(new Blob([xlsFile.data], { type: xlsFile.type }), xlsFile.filename)
    })
  }

  render() {
    return (
      <div className="container back-content">
        <div className="page-header">
          <h1>Candidatures</h1>
        </div>
        <div className="row">
          <a className="btn btn-info btn-xs pull-right help-block" target="_blank" href="https://github.com/sgmap/etudiant-entrepreneur/wiki/Guide-d'utilisation-des-PEPITE#extraction" title="Comment formatter?">?</a>
          <a className="btn btn-warning btn-small pull-right" target="_blank" onClick={this.getPepiteApplicationXls}>Extraire</a>
        </div>
        <Tabs defaultActiveKey={1}>
          <Tab eventKey={1} title={<div>En attente <span className="badge">{this.state.applications.length}</span></div>}>
            <PepiteApplicantTable applicants={this.state.applications} />
          </Tab>
          <Tab eventKey={2} title={<div>Acceptées <span className="badge">{this.state.accepted.length}</span></div>}>
            <PepiteAcceptedApplicantTable applicants={this.state.accepted} userToken={this.props.user.token} />
          </Tab>
          <Tab eventKey={3} title={<div>Réfusées <span className="badge">{this.state.refused.length}</span></div>}>
            <PepiteApplicantTable applicants={this.state.refused} />
          </Tab>
        </Tabs>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(applicationActions, dispatch),
  }
}

PepiteHomePage.propTypes = {
  actions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(PepiteHomePage)
