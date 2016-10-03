import React, {PropTypes} from 'react'
import ProjectForm from './ProjectForm'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as projectActions from '../../../actions/projectActions'
import * as errorsActions from '../../../actions/errorsActions'
import {projectValidationConstraints} from './ProjectValidationConstraints'
import Validation from '../../common/Validation'

export class ProjectPage extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      project: Object.assign({
        name: "",
        summary: "",
        type: "",
        step: "",
        site: "",
        status: "",
        blog: "",
        facebook: "",
        twitter: "",
        siret: "",
        activitySummary: "",
        stepSummary: "",
        sector: "0",
        otherSector: "",
        motiviation: ""
      }, props.project),
      errors: Object.assign({}, props.errors)
    }
    this.updateProjectState = this.updateProjectState.bind(this)
    this.projectValidation = new Validation(projectValidationConstraints)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ errors: Object.assign({}, nextProps.errors) })
    this.setState({ project: Object.assign({}, nextProps.project) })
  }

  updateProjectState(event) {
    const field = event.target.name
    let project = this.state.project
    project[field] = event.target.value
    this.validateProjectField(field, event.target.value)
    this.props.actions.updateProject(project)
    return this.setState({ project })
  }

  validateProjectField(field, value) {
    const errors = Object.assign({}, this.state.errors)
    errors[field] = this.projectValidation.validateField(field, value)
    if (errors[field] == null) {
      delete errors[field]
    }
    this.props.errorsActions.updateComponentErrors('project', errors)
    return this.setState({ errors })
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
  project: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  errorsActions: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    project: state.project,
    errors: state.errors.project
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(projectActions, dispatch),
    errorsActions: bindActionCreators(errorsActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPage)
