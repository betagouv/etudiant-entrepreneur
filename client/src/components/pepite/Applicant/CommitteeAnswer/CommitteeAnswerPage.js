import React, { PropTypes } from 'react'
import toastr from 'toastr'

import ProjectPage from '../../../application/Project/ProjectPage'
import TeamPage from '../../../application/Team/TeamPage'
import ContactPage from '../../../application/Contact/ContactPage'
import PepitePage from '../../../application/Pepite/PepitePage'
import SendPage from '../../../application/Send/SendPage'
import CareerPage from '../../../application/Career/CareerPage'
import ProfilePage from '../../../application/Profile/ProfilePage'
import CommitteeAnswerForm from './CommitteeAnswerForm'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as applicationActions from '../../../../actions/applicationActions'
import * as committeeAnswerActions from '../../../../actions/committeeAnswerActions'
import Validation from '../../../common/Validation'
import { committeeAnswerValidationConstraints } from './CommitteeAnswerValidationConstraints'
import {isEmptyObject} from '../../../common/validationHelper.js'


class CommitteeAnswerPage extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      committeeAnswer: Object.assign({
        opinion: '',
        status: ''
      }, props.committeeAnswer),
      errors: {},
    }
    this.updateCommitteeAnswerState = this.updateCommitteeAnswerState.bind(this)
    this.committeeAnswerValidation = new Validation(committeeAnswerValidationConstraints)
    this.saveAnswer = this.saveAnswer.bind(this)
  }

  componentDidMount() {
    if (this.props.applicationId) {
      this.props.actions.loadApplication(this.props.applicationId).catch((err) => {
        toastr.error(err)
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ committeeAnswer: Object.assign({}, nextProps.committeeAnswer) })
  }

  updateCommitteeAnswerState(event) {
    const field = event.target.name
    const committeeAnswer = this.state.committeeAnswer
    committeeAnswer[field] = event.target.value
    return this.setState({ committeeAnswer })
  }

  validateCommitteeAnswer() {
    const errors = this.committeeAnswerValidation.validateAllFields(this.state.committeeAnswer)
    this.setState({ errors })
    return (isEmptyObject(errors))
  }

  saveAnswer(event) {
    event.preventDefault()
    if (!this.validateCommitteeAnswer()) {
      return
    }
    this.props.committeeAnswerActions.saveCommitteeAnswer(this.props.applicationId, this.state.committeeAnswer)
      .then((application) => {
        toastr.success("Avis sauvegardé")
        this.context.router.push('/pepite/applicant')
      })
      .catch((err) => {
        toastr.error(err)
      })
  }

  render() {
    return (
      <div className="container back-content">
        <div className="page-header">
          <h1>Avis du comité d'engagement pour {this.props.applicantFullname}</h1>
        </div>
        <CommitteeAnswerForm
          committeeAnswer={this.state.committeeAnswer}
          onChange={this.updateCommitteeAnswerState}
          errors={this.state.errors}
          saveAnswer={this.saveAnswer} />
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    applicationId: ownProps.params.id,
    committeeAnswer: state.committeeAnswer,
    applicantFullname: `${state.contact.firstname} ${state.contact.name}`
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(applicationActions, dispatch),
    committeeAnswerActions: bindActionCreators(committeeAnswerActions, dispatch)
  }
}

CommitteeAnswerPage.propTypes = {
  actions: PropTypes.object.isRequired,
  committeeAnswerActions: PropTypes.object.isRequired,
  committeeAnswer: PropTypes.object.isRequired,
  applicantFullname: PropTypes.string.isRequired,
  applicationId: PropTypes.string
}

CommitteeAnswerPage.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(CommitteeAnswerPage)
