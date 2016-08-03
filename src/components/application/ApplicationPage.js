import React from 'react'
import {Link} from 'react-router'
import ProjectForm from './Forms/ProjectForm'
import {Button} from 'react-bootstrap'

class ApplicationPage extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      project: {}
    }

    this.updateProjectState = this.updateProjectState.bind(this)
  }

  updateProjectState(event) {
    const field = event.target.name
    let project = this.state.project
    project[field] = event.target.value
    return this.setState({project})
  }

  render() {
    return (
      <div className="jumbotron">
          <ProjectForm
            project={this.state.project}
            onChange={this.updateProjectState}
          />
          <Button bsStyle="primary">Enregistrer</Button>
      </div>
    )
  }
}

export default ApplicationPage
