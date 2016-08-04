import React from 'react'
import {Link} from 'react-router'
import {Button} from 'react-bootstrap'
import Multistep from '../common/MultiStep'
import ApplicantForm from './Applicant/ApplicantForm'
import ProjectForm from './Project/ProjectForm'

class ApplicationPage extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      application: {
        project: { name: "TOTOTO"},
        applicant: { name: ""}
      }
    }
    this.getSteps = this.getSteps.bind(this)
    this.updateProjectState = this.updateProjectState.bind(this)
    this.updateApplicantState = this.updateApplicantState.bind(this)
  }

  updateProjectState(event) {
    const field = event.target.name
    let project = this.state.application.project
    project[field] = event.target.value
    console.log(this.state.application)
    return this.setState({application: this.state.application})
  }

  updateApplicantState(event) {
    const field = event.target.name
    let applicant = this.state.application.applicant
    applicant[field] = event.target.value
    return this.setState({application: this.state.application})
  }

  getSteps() {
    return (
      [
        { name: 'Informations', component: <ApplicantForm applicant={this.state.application.applicant} onChange={this.updateApplicantState} /> },
        { name: 'Mon Projet', component: <ProjectForm project={this.state.application.project} onChange={this.updateProjectState} /> },
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
