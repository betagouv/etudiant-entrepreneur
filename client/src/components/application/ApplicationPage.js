import React, {PropTypes} from 'react'
import toastr from 'toastr'
import Multistep from '../common/MultiStep'
import SavePage from './Save/SavePage'
import ProjectPage from './Project/ProjectPage'
import TeamPage from './Team/TeamPage'
import ContactPage from './Contact/ContactPage'
import PepitePage from './Pepite/PepitePage'
import SendPage from './Send/SendPage'
import CareerPage from './Career/CareerPage'
import ProfilePage from './Profile/ProfilePage'
import { Modal } from 'react-bootstrap'
import '../../styles/apply-form.css'
import {isEmptyObject} from '../common/validationHelper'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as errorsActions from '../../actions/errorsActions'


class ApplicationPage extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      isSaveShown: false
    }
    this.getSteps = this.getSteps.bind(this)
    this.closeSave = this.closeSave.bind(this)
    this.openSave = this.openSave.bind(this)
    this.canNavigate = this.canNavigate.bind(this)
  }

  openSave(event) {
    event.preventDefault()
    if (this.props.actions.validateContact()) {
      this.setState({ isSaveShown: true })
    } else {
      toastr.error("Pour sauvegarder, 'Mes Informations' doit être complet et valide")
    }
  }

  closeSave() {
    this.setState({ isSaveShown: false })
  }

  hasError(componentName) {
    return !isEmptyObject(this.props.errors[componentName])
  }

  getSteps() {
    return (
      [
        { name: 'Mes Infos', component: <ContactPage />, hasError: this.hasError('contact') },
        { name: 'Mon Équipe', component: <TeamPage /> },
        { name: 'Mon Projet', component: <ProjectPage /> },
        { name: 'Mon PEPITE', component: <PepitePage /> },
        { name: 'Mon Parcours', component: <CareerPage /> },
        { name: 'Mon Profil', component: <ProfilePage /> },
        { name: 'Envoi', component: <SendPage /> }
      ]
    )
  }

  canNavigate(stepIndex) {
    if (stepIndex == 0) {
      const isContactValid = this.props.actions.validateContact()
      if (!isContactValid) {
        toastr.error("Avant de continuer, 'Mes Informations' doit être complet et valide")
      }
      return isContactValid
    }
    return true
  }

  render() {
    return (
      <div className="jumbotron">
        <Multistep steps={this.getSteps()} save={this.openSave} canNavigate={this.canNavigate}/>
        <Modal show={this.state.isSaveShown} onHide={this.closeSave}>
          <Modal.Header>
            <Modal.Title>Sauvegarder mon formulaire</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SavePage />
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}


function mapStateToProps(state, ownProps) {
  return {
    errors: state.errors
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(errorsActions, dispatch)
  }
}

ApplicationPage.propTypes = {
  actions: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationPage)
