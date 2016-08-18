import React from 'react'
import {Link} from 'react-router'
import {Button} from 'react-bootstrap'
import _ from 'lodash'
import Multistep from '../common/MultiStep'
import SaveModal from './Save/SaveModal'
import ProjectPage from './Project/ProjectPage'
import TeamPage from './Team/TeamPage'
import {contactValidationConstraints} from './Save/ContactValidationConstraints'
import Validation from '../common/Validation'
import '../../styles/apply-form.css'


class ApplicationPage extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
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
    this.updateContactState = this.updateContactState.bind(this)
    this.saveForm = this.saveForm.bind(this)
    this.closeSave = this.closeSave.bind(this)
    this.openSave = this.openSave.bind(this)

    this.contactValidation = new Validation(contactValidationConstraints)
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

  getSteps() {
    return (
      [
        { name: 'Mon Projet', component: <ProjectPage /> },
        { name: 'Mon Équipe', component: <TeamPage /> },
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
