import React from 'react'
import {Link} from 'react-router'
import {Button} from 'react-bootstrap'
import _ from 'lodash'
import Multistep from '../common/MultiStep'
import ApplicantForm from './Applicant/ApplicantForm'
import ProjectForm from './Project/ProjectForm'
import TeamForm from './Team/TeamForm'
import {projectValidationConstraints} from './Project/ProjectValidationConstraints'
import {teamMemberValidationConstraints} from './Team/TeamMemberValidationConstraints'
import Validation from '../common/Validation'
import '../../styles/apply-form.css'

class ApplicationPage extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      project: {
        name: "",
        summary: "",
        type: "0",
        step: "",
        site: "",
        blog: "",
        facebook: "",
        twitter: "",
        siret: "",
        activitySummary: "",
        stepSummary: "",
        nextStepSummary: ""
      },
      applicant: { name: "" },
      team: [],
      newMember: {
        name: "",
        firstname: "",
        role: "",
        diploma: ""
      },
      errors: {}
    }
    this.getSteps = this.getSteps.bind(this)
    this.updateProjectState = this.updateProjectState.bind(this)
    this.updateApplicantState = this.updateApplicantState.bind(this)
    this.addTeamMember = this.addTeamMember.bind(this)
    this.updateNewMemberState = this.updateNewMemberState.bind(this)

    this.projectValidation = new Validation(projectValidationConstraints)
    this.teamMemberValidation = new Validation(teamMemberValidationConstraints)
  }

  updateProjectState(event) {
    const field = event.target.name
    let project = this.state.project
    project[field] = event.target.value
    this.validateProjectField(field, event.target.value)
    return this.setState({ project })
  }

  validateProjectField(field, value) {
    let errors = {}
    errors[field] = this.projectValidation.validateField(field, value)
    return this.setState(Object.assign(this.state.errors, errors))
  }

  updateApplicantState(event) {
    const field = event.target.name
    let applicant = this.state.applicant
    applicant[field] = event.target.value
    return this.setState({ applicant })
  }

  updateNewMemberState(event) {
    const field = event.target.name
    let newMember = this.state.newMember
    newMember[field] = event.target.value
    this.validateNewMemberField(field, event.target.value)
    return this.setState({ newMember })
  }

  validateNewMember() {
    const errors = this.teamMemberValidation.validateAllFields(this.state.newMember)
    this.setState({ errors })
    return (!_.isEmpty(errors))
  }

  validateNewMemberField(field, value) {
    let errors = this.state.errors
    errors[field] = this.teamMemberValidation.validateField(field, value)
    return this.setState({ errors })
  }

  addTeamMember(event) {
    event.preventDefault()

    if (this.validateNewMember()) {
      return
    }

    this.setState({
      newMember: {
        name: "",
        firstname: "",
        role: "",
        diploma: ""
      },
      errors: {}
    })

    return this.setState({ team: [...this.state.team, this.state.newMember] })
  }

  getSteps() {
    return (
      [
        { name: 'Informations', component: <ApplicantForm applicant={this.state.applicant} onChange={this.updateApplicantState} /> },
        { name: 'Mon Projet', component: <ProjectForm project={this.state.project} onChange={this.updateProjectState} errors={this.state.errors} /> },
        { name: 'Mon Équipe', component: <TeamForm team={this.state.team} newMember={this.state.newMember} addMember={this.addTeamMember} onChange={this.updateNewMemberState} errors={this.state.errors} /> },
      ]
    )
  }

  render() {
    return (
      <div className="jumbotron">
        <Multistep steps={this.getSteps()} />
      </div>
    )
  }
}

export default ApplicationPage
