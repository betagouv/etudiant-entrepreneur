import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as projectActions from '../../../actions/projectActions'
import TeamForm from './TeamForm'
import Validation from '../../common/Validation'
import {teamMemberValidationConstraints} from './TeamMemberValidationConstraints'
import {isEmptyObject} from '../../common/validationHelper.js'

export class TeamPage extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      project: Object.assign({ teamType: '' }, props.project),
      team: [...props.team],
      newMember: Object.assign({
        name: '',
        firstname: '',
        role: '',
        diploma: '',
        email: '',
        situation: '',
        skill: ''
      },
        props.newMember
      ),
      memberErrors: {}
    }
    this.addTeamMember = this.addTeamMember.bind(this)
    this.updateNewMemberState = this.updateNewMemberState.bind(this)
    this.updateProjectState = this.updateProjectState.bind(this)
    this.onMemberDelete = this.onMemberDelete.bind(this)
    this.teamMemberValidation = new Validation(teamMemberValidationConstraints)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ team: [...nextProps.team] })
    this.setState({ project: Object.assign({}, nextProps.project) })
  }

  updateNewMemberState(event) {
    const field = event.target.name
    let newMember = this.state.newMember
    newMember[field] = event.target.value
    this.validateNewMemberField(field, event.target.value)
    return this.setState({ newMember })
  }

  updateProjectState(event) {
    const field = event.target.name
    let project = this.state.project
    project[field] = event.target.value
    this.props.actions.updateProject(project)
    return this.setState({ project })
  }

  validateNewMember() {
    const memberErrors = this.teamMemberValidation.validateAllFields(this.state.newMember)
    this.setState({ memberErrors })
    return (isEmptyObject(memberErrors))
  }

  validateNewMemberField(field, value) {
    const memberErrors = this.state.memberErrors
    memberErrors[field] = this.teamMemberValidation.validateField(field, value)
    return this.setState({ memberErrors })
  }

  onMemberDelete(member) {
    const team = [...this.state.team.filter((m) => m != member)]
    this.props.actions.updateTeam(team)

    return this.setState({
      newMember: {
        name: '',
        firstname: '',
        role: '',
        diploma: '',
        email: '',
        situation: '',
        skill: ''
      },
      memberErrors: {},
      team
    })
  }

  addTeamMember(event) {
    event.preventDefault()

    if (!this.validateNewMember()) {
      return
    }

    const team = [...this.state.team, this.state.newMember]

    this.props.actions.updateTeam(team)

    return this.setState({
      newMember: {
        name: '',
        firstname: '',
        role: '',
        diploma: '',
        email: '',
        situation: '',
        skill: ''
      },
      memberErrors: {},
      team
    })
  }

  render() {
    return (
      <TeamForm team={this.state.team}
        project={this.state.project}
        newMember={this.state.newMember}
        addMember={this.addTeamMember}
        onChange={this.updateNewMemberState}
        projectOnChange={this.updateProjectState}
        onMemberDelete={this.onMemberDelete}
        memberErrors={this.state.memberErrors} />
    )
  }
}

TeamPage.propTypes = {
  team: PropTypes.array.isRequired,
  project: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  newMember: PropTypes.object
}

function mapStateToProps(state, ownProps) {
  return {
    team: state.project.team,
    project: state.project
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(projectActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamPage)
