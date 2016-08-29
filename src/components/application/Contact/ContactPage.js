import React, {PropTypes} from 'react'
import ContactForm from './ContactForm'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as contactActions from '../../../actions/contactActions'
import {contactValidationConstraints} from './ContactValidationConstraints'
import Validation from '../../common/Validation'
import {isEmptyObject} from '../../common/validationHelper.js'

class ContactPage extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      contact: Object.assign({
        name: '',
        firstname: '',
        email: '',
        phone: '',
        situation: ''
      }, props.contact),
      errors: {},
    }
    this.updateContactState = this.updateContactState.bind(this)
    this.contactValidation = new Validation(contactValidationConstraints)
  }

  updateContactState(event) {
    const field = event.target.name
    let contact = this.state.contact
    contact[field] = event.target.value
    this.validateContactField(field, event.target.value)
    this.props.actions.saveContact(contact)
    return this.setState({ contact })
  }

  validateContactField(field, value) {
    let errors = this.state.errors
    errors[field] = this.contactValidation.validateField(field, value)
    return this.setState({ errors })
  }

  validateSave() {
    const errors = this.contactValidation.validateAllFields(this.state.contact)
    this.setState({ errors })
    return (isEmptyObject(errors))
  }

  render() {
    return (
      <ContactForm
        contact={this.state.contact}
        onChange={this.updateContactState}
        errors={this.state.errors}/>
    )
  }
}

function mapStateToProps(state, ownProps) {

  return {
    contact: state.contact
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(contactActions, dispatch)
  }
}

ContactPage.propTypes = {
  contact: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactPage)
