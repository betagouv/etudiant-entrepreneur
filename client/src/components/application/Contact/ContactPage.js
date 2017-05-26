import React, { PropTypes } from 'react'
import ContactForm from './ContactForm'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as contactActions from '../../../actions/contactActions'
import * as applicationActions from '../../../actions/applicationActions'
import * as errorsActions from '../../../actions/errorsActions'
import * as careerActions from '../../../actions/careerActions'
import { contactValidationConstraints } from './ContactValidationConstraints'
import Validation from '../../common/Validation'
import { isEmptyObject } from '../../common/validationHelper.js'
import RenewContainer from './RenewContainer'

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
    this.setState({ contact: Object.assign({}, nextProps.contact) })
  }

  updateContactState(event) {
    const field = event.target.name
    const contact = this.state.contact
    contact[field] = event.target.value
    this.validateContactField(field, event.target.value)
    if (field === 'situation' && event.target.value === 'student') {
      this.props.careerActions.updateStudentCareer(contact.schoolYear)
    }
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

  isRenewIdDisplayed() {
    return (this.props.contact.isRenew == 'true')
  }

  render() {
    return (
      <div>
        <ContactForm
          contact={this.state.contact}
          onChange={this.updateContactState}
          errors={this.state.errors} />
        {this.isRenewIdDisplayed() && <RenewContainer
          copyApplication={this.props.applicationActions.copyApplication}
          isRenew={this.props.contact.isRenew} />}
      </div>
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
    applicationActions: bindActionCreators(applicationActions, dispatch),
    careerActions: bindActionCreators(careerActions, dispatch),
    errorsActions: bindActionCreators(errorsActions, dispatch)
  }
}

ContactPage.propTypes = {
  contact: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  applicationActions: PropTypes.object.isRequired,
  careerActions: PropTypes.object.isRequired,
  errorsActions: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactPage)
