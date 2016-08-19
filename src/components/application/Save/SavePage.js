import React, {PropTypes} from 'react'
import SaveForm from './SaveForm'
import {contactValidationConstraints} from './ContactValidationConstraints'
import Validation from '../../common/Validation'
import _ from 'lodash'

class SavePage extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      contact: Object.assign({
        name: '',
        firstname: '',
        email: '',
        link: ''
      }, props.contact),
      errors: {},
    }
    this.updateContactState = this.updateContactState.bind(this)
    this.saveForm = this.saveForm.bind(this)

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
    if (typeof this.props.onSaveSuccess == 'function') {
      this.props.onSaveSuccess()
    }
    return this.setState(
      Object.assign(
        this.state.contact,
        { link: 'https://etudiant-entrepreneur.beta.gouv.fr/apply/wbwadsfrazrazlkazfk' }
      )
    )
  }

  validateContactField(field, value) {
    let errors = this.state.errors
    errors[field] = this.contactValidation.validateField(field, value)
    return this.setState({ errors })
  }

  validateSave() {
    const errors = this.contactValidation.validateAllFields(this.state.contact)
    this.setState({ errors })
    return (_.isEmpty(errors))
  }

  render() {
    return (
      <SaveForm
        contact={this.state.contact}
        saveForm={this.saveForm}
        onChange={this.updateContactState}
        errors={this.state.errors}/>
    )
  }
}

SavePage.propTypes = {
  onSaveSuccess: PropTypes.func,
  contact: PropTypes.object
}

export default SavePage
