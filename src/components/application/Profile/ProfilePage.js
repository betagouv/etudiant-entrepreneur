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
      errors: {},
    }
    this.updateProfileState = this.updateProfileState.bind(this)
  }

  updateProfileState(event) {
    const field = event.target.name
    let profile = this.state.profile
    profile[field] = event.target.value
    this.props.actions.updateProfile(profile)
    return this.setState({ profile })
  }
  render() {
    return (
      <ProfileForm
        profile={this.state.profile}
        onChange={this.updateProfileState}
        errors={this.state.errors}/>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    profile: state.profile
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(profileActions, dispatch)
  }
}

ProfilePage.propTypes = {
  profile: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
