import React from 'react'
import {Link} from 'react-router'
import {Button} from 'react-bootstrap'
import _ from 'lodash'
import Multistep from '../common/MultiStep'
import SaveModal from './Save/SaveModal'
import ProjectForm from './Project/ProjectForm'
import TeamForm from './Team/TeamForm'
import {projectValidationConstraints} from './Project/ProjectValidationConstraints'
import {teamMemberValidationConstraints} from './Team/TeamMemberValidationConstraints'
import {contactValidationConstraints} from './Save/ContactValidationConstraints'
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
      contact: {
        name: "",
        firstname: "",
        email: "",
        link: ""
      },
      team: [],
      newMember: {
        name: "",
        firstname: "",
        role: "",
        diploma: ""
      },
      errors: {},
      contactErrors: {},
      isSaveShown: false
    }
    this.getSteps = this.getSteps.bind(this)
    this.updateProjectState = this.updateProjectState.bind(this)
    this.updateContactState = this.updateContactState.bind(this)
    this.addTeamMember = this.addTeamMember.bind(this)
    this.updateNewMemberState = this.updateNewMemberState.bind(this)
    this.saveForm = this.saveForm.bind(this)
    this.closeSave = this.closeSave.bind(this)
    this.openSave = this.openSave.bind(this)

    this.projectValidation = new Validation(projectValidationConstraints)
    this.teamMemberValidation = new Validation(teamMemberValidationConstraints)
    this.contactValidation = new Validation(contactValidationConstraints)
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

  updateContactState(event) {
    const field = event.target.name
    let contact = this.state.contact
    contact[field] = event.target.value
    this.validateContactField(field, event.target.value)
    return this.setState({ contact })
  }

  saveForm(event) {
    event.preventDefault()
    if (!this.validateSave()) {
      return
    }
    return this.setState(
      Object.assign(
        this.state.contact,
        { link: "https://etudiant-entrepreneur.beta.gouv.fr/apply/wbwadsfrazrazlkazfk"}
      )
    )
  }

  validateContactField(field, value) {
    let contactErrors = this.state.contactErrors
    contactErrors[field] = this.contactValidation.validateField(field, value)
    return this.setState({ contactErrors })
  }

  validateSave() {
    const contactErrors = this.contactValidation.validateAllFields(this.state.contact)
    this.setState({ contactErrors })
    return (_.isEmpty(contactErrors))
  }

  openSave(event) {
    event.preventDefault()
    this.setState({ isSaveShown: true })
  }

  closeSave() {
    this.setState({ isSaveShown: false })
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
    return (_.isEmpty(errors))
  }

  validateNewMemberField(field, value) {
    let errors = this.state.errors
    errors[field] = this.teamMemberValidation.validateField(field, value)
    return this.setState({ errors })
  }

  addTeamMember(event) {
    event.preventDefault()

    if (!this.validateNewMember()) {
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
        { name: 'Mon Projet', component: <ProjectForm project={this.state.project} onChange={this.updateProjectState} errors={this.state.errors} /> },
        { name: 'Mon Équipe', component: <TeamForm team={this.state.team} newMember={this.state.newMember} addMember={this.addTeamMember} onChange={this.updateNewMemberState} errors={this.state.errors} /> },
      ]
    )
  }

  render() {
    return (
      <div className="jumbotron">
        <Multistep steps={this.getSteps()} save={this.openSave} />
        <SaveModal
          contact={this.state.contact}
          saveForm={this.saveForm}
          isSaveShown={this.state.isSaveShown}
          closeSave={this.closeSave}
          onChange={this.updateContactState}
          errors={this.state.contactErrors}/>
      </div>
    )
  }
}

export default ApplicationPage
