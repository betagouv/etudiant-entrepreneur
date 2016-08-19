import React from 'react'
import Multistep from '../common/MultiStep'
import SavePage from './Save/SavePage'
import ProjectPage from './Project/ProjectPage'
import TeamPage from './Team/TeamPage'
import { Modal } from 'react-bootstrap'
import '../../styles/apply-form.css'


class ApplicationPage extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      isSaveShown: false
    }
    this.getSteps = this.getSteps.bind(this)
    this.closeSave = this.closeSave.bind(this)
    this.openSave = this.openSave.bind(this)

  }

  openSave(event) {
    event.preventDefault()
    this.setState({ isSaveShown: true })
  }

  closeSave() {
    this.setState({ isSaveShown: false })
  }

  getSteps() {
    return (
      [
        { name: 'Mon Projet', component: <ProjectPage /> },
        { name: 'Mon Équipe', component: <TeamPage /> },
      ]
    )
  }

  render() {
    return (
      <div className="jumbotron">
        <Multistep steps={this.getSteps()} save={this.openSave} />
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

export default ApplicationPage
