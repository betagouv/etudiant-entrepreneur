import React, {PropTypes} from 'react'
import ProfileForm from './ProfileForm'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as profileActions from '../../../actions/profileActions'

class ProfilePage extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      profile: Object.assign({}, props.profile),
      contact: Object.assign({}, props.contact),
      errors: {},
    }
    this.updateProfileState = this.updateProfileState.bind(this)
    this.updateProfileDate = this.updateProfileDate.bind(this)
  }

  updateProfileState(event) {
    const field = event.target.name
    let profile = this.state.profile
    profile[field] = event.target.value
    this.props.actions.updateProfile(profile)
    return this.setState({ profile })
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
        profile={this.state.profile}
        contact={this.state.contact}
        onChange={this.updateProfileState}
        errors={this.state.errors}
        onDateChange={this.updateProfileDate}/>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    profile: state.profile,
    contact: state.contact
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(profileActions, dispatch)
  }
}

ProfilePage.propTypes = {
  profile: PropTypes.object.isRequired,
  contact: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
