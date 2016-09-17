import React, {PropTypes} from 'react'
import ProfileForm from './ProfileForm'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as profileActions from '../../../actions/profileActions'
import * as errorsActions from '../../../actions/errorsActions'
import {profileValidationConstraints} from './ProfileValidationConstraints'
import Validation from '../../common/Validation'

class ProfilePage extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.updateProfileState = this.updateProfileState.bind(this)
    this.updateProfileDate = this.updateProfileDate.bind(this)
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
    const errors = this.props.errors
    errors[field] = this.profileValidation.validateField(field, value)
    if (errors[field] == null) {
      delete errors[field]
    }
    this.props.errorsActions.updateComponentErrors('profile', errors)
  }

  updateProfileDate(date) {
    let profile = this.state.profile
    profile.birthDate = date
    this.props.actions.updateProfile(profile)
    return this.setState({ profile })
  }

  render() {
    return (
      <ProfileForm
        profile={this.props.profile}
        contact={this.props.contact}
        onChange={this.updateProfileState}
        errors={this.props.errors}
        onDateChange={this.updateProfileDate}/>
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
  errors: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
