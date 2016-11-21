import React, {PropTypes} from 'react'
import toastr from 'toastr'

import ProjectPage from './Project/ProjectPage'
import TeamPage from './Team/TeamPage'
import ContactPage from './Contact/ContactPage'
import PepitePage from './Pepite/PepitePage'
import SendPage from './Send/SendPage'
import CareerPage from './Career/CareerPage'
import ProfilePage from './Profile/ProfilePage'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as errorsActions from '../../actions/errorsActions'
import * as applicationActions from '../../actions/applicationActions'


class ApplicationPage extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  componentDidMount() {
    if (this.props.applicationId) {
      this.props.applicationActions.loadApplication(this.props.applicationId).catch((err) => {
        toastr.error(err)
      })
    }
  }

  render() {
    return (
      <div className="container">
        <ContactPage/>
        <TeamPage/>
        <ProjectPage/>
        <PepitePage/>
        <CareerPage/>
        <ProfilePage/>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    errors: state.errors,
    applicationId: ownProps.params.id
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(errorsActions, dispatch),
    applicationActions: bindActionCreators(applicationActions, dispatch)
  }
}

ApplicationPage.propTypes = {
  actions: PropTypes.object.isRequired,
  applicationActions: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  applicationId: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationPage)
