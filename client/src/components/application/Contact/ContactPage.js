import React, {PropTypes} from 'react'
import ContactForm from './ContactForm'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as contactActions from '../../../actions/contactActions'
import * as errorsActions from '../../../actions/errorsActions'
import {contactValidationConstraints} from './ContactValidationConstraints'
import Validation from '../../common/Validation'
import {isEmptyObject} from '../../common/validationHelper.js'

export class ContactPage extends React.Component {
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
      errors: Object.assign({}, props.errors),
    }
    this.updateContactState = this.updateContactState.bind(this)
    this.contactValidation = new Validation(contactValidationConstraints)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ errors: Object.assign({}, nextProps.errors) })
  }

  updateContactState(event) {
    const field = event.target.name
    let contact = this.state.contact
    contact[field] = event.target.value
    this.validateContactField(field, event.target.value)
    this.props.actions.updateContact(contact)
  }

  validateContactField(field, value) {
    let errors = this.state.errors
    errors[field] = this.contactValidation.validateField(field, value)
    if (errors[field] == null) {
      delete errors[field]
    }
    this.props.errorsActions.updateComponentErrors('contact', errors)
    return this.setState({ errors })
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
    errors: state.errors.contact,
    contact: state.contact
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(contactActions, dispatch),
    errorsActions: bindActionCreators(errorsActions, dispatch)
  }
}

ContactPage.propTypes = {
  contact: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  errorsActions: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactPage)
