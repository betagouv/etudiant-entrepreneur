import React, {PropTypes} from 'react'
import ProjectForm from './ProjectForm'
import {projectValidationConstraints} from './ProjectValidationConstraints'
import Validation from '../../common/Validation'

class ProjectPage extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      project: Object.assign({
        name: "",
        summary: "",
        type: "0",
        step: "",
        site: "",
        blog: "",
        facebook: "",
        twitter: "",
        siret: "",
        activitySummary: "",
        stepSummary: "",
        nextStepSummary: ""
      }, props.project),
      errors: {}
    }
    this.updateProjectState = this.updateProjectState.bind(this)
    this.projectValidation = new Validation(projectValidationConstraints)
  }

  updateProjectState(event) {
    const field = event.target.name
    let project = this.state.project
    project[field] = event.target.value
    this.validateProjectField(field, event.target.value)
    return this.setState({ project })
  }

  validateProjectField(field, value) {
    let errors = {}
    errors[field] = this.projectValidation.validateField(field, value)
    return this.setState(Object.assign(this.state.errors, errors))
  }

  render() {
    return (
      <ProjectForm project={this.state.project}
        onChange={this.updateProjectState}
        errors={this.state.errors} />
    )
  }
}

ProjectPage.propTypes = {
  project: PropTypes.object,
}

export default ProjectPage
