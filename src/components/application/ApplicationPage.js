import React from 'react'
import {Link} from 'react-router'
import {Button} from 'react-bootstrap'
import Multistep from '../common/MultiStep'
import ApplicantForm from './Applicant/ApplicantForm'
import ProjectForm from './Project/ProjectForm'
import {projectValidationConstraints} from './Project/ProjectValidationConstraints'
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
      errors: {}
    }
    this.getSteps = this.getSteps.bind(this)
    this.updateProjectState = this.updateProjectState.bind(this)
    this.updateApplicantState = this.updateApplicantState.bind(this)

    this.projectValidation = new Validation(projectValidationConstraints)
  }

  updateProjectState(event) {
    const field = event.target.name
    let project = this.state.project
    project[field] = event.target.value
    this.validateProjectField(field, event.target.value)
    return this.setState({ project })
  }

  validateProjectField(field, value) {
    let isFieldValid = true
    let errors = {}

    errors[field] = this.projectValidation.validateField(field, value)
    this.setState(Object.assign(this.state.errors, errors))

    return isFieldValid
  }

  updateApplicantState(event) {
    const field = event.target.name
    let applicant = this.state.applicant
    applicant[field] = event.target.value
    return this.setState({ applicant })
  }

  getSteps() {
    return (
      [
        { name: 'Informations', component: <ApplicantForm applicant={this.state.applicant} onChange={this.updateApplicantState} /> },
        { name: 'Mon Projet', component: <ProjectForm project={this.state.project} onChange={this.updateProjectState} errors={this.state.errors} /> },
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
