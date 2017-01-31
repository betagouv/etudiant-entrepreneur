import React, { PropTypes } from 'react'
import ProfileForm from './ProfileForm'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Moment from 'moment'
import * as profileActions from '../../../actions/profileActions'
import * as errorsActions from '../../../actions/errorsActions'
import { profileValidationConstraints } from './ProfileValidationConstraints'
import Validation from '../../common/Validation'

export class ProfilePage extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.updateProfileState = this.updateProfileState.bind(this)
    this.updateProfileDate = this.updateProfileDate.bind(this)
    this.onProfileDateInit = this.onProfileDateInit.bind(this)
    this.profileValidation = new Validation(profileValidationConstraints)
  }

  updateProfileState(event) {
    const field = event.target.name
    const profile = Object.assign({}, this.props.profile)
    profile[field] = event.target.value
    this.validateProfileField(field, event.target.value)
    this.props.actions.updateProfile(profile)
  }

  validateProfileField(field, value) {
    const errors = Object.assign({}, this.props.errors)
    errors[field] = this.profileValidation.validateField(field, value)
    if (errors[field] == null) {
      delete errors[field]
    }
    this.props.errorsActions.updateComponentErrors('profile', errors)
  }

  updateProfileDate(event) {
    if (event.target.value.length === 10) {
      const date = new Moment.utc(event.target.value, 'DD/MM/YYYY').format()
      const profile = Object.assign({}, this.props.profile)
      profile.birthDate = date
      this.validateProfileField('birthDate', date)
      this.props.actions.updateProfile(profile)
    }
  }

  onProfileDateInit(dateField) {
    const rawBirthdate = new Moment.utc(this.props.profile.birthDate).format('DDMMYYYY')
    dateField.setRawValue(rawBirthdate)
  }

  render() {
    return (
      <ProfileForm
        profile={this.props.profile}
        contact={this.props.contact}
        onChange={this.updateProfileState}
        errors={this.props.errors}
        onDateChange={this.updateProfileDate}
        onDateInit={this.onProfileDateInit} />
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    profile: state.profile,
    contact: state.contact,
    errors: state.errors.profile
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(profileActions, dispatch),
    errorsActions: bindActionCreators(errorsActions, dispatch)
  }
}

ProfilePage.propTypes = {
  profile: PropTypes.object.isRequired,
  contact: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  errorsActions: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
