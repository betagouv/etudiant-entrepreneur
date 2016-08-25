import React, {PropTypes} from 'react'
import _ from 'lodash'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as projectActions from '../../../actions/projectActions'
import TeamForm from './TeamForm'
import Validation from '../../common/Validation'
import {teamMemberValidationConstraints} from './TeamMemberValidationConstraints'

export class TeamPage extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      team: props.team,
      newMember: Object.assign({
        name: '',
        firstname: '',
        role: '',
        diploma: ''
      },
        props.newMember
      ),
      errors: {}
    }
    this.addTeamMember = this.addTeamMember.bind(this)
    this.updateNewMemberState = this.updateNewMemberState.bind(this)
    this.teamMemberValidation = new Validation(teamMemberValidationConstraints)
  }

  updateNewMemberState(event) {
    const field = event.target.name
    let newMember = this.state.newMember
    newMember[field] = event.target.value
    this.validateNewMemberField(field, event.target.value)
    return this.setState({ newMember })
  }

  validateNewMember() {
    const errors = this.teamMemberValidation.validateAllFields(this.state.newMember)
    this.setState({ errors })
    return (_.isEmpty(errors))
  }

  validateNewMemberField(field, value) {
    let errors = this.state.errors
    errors[field] = this.teamMemberValidation.validateField(field, value)
    return this.setState({ errors })
  }

  addTeamMember(event) {
    event.preventDefault()

    if (!this.validateNewMember()) {
      return
    }

    this.props.actions.saveMember(this.state.newMember)

    this.setState({
      newMember: {
        name: '',
        firstname: '',
        role: '',
        diploma: ''
      },
      errors: {}
    })

    return this.setState({ team: [...this.state.team, this.state.newMember] })
  }

  render() {
    return (
      <TeamForm team={this.state.team}
        newMember={this.state.newMember}
        addMember={this.addTeamMember}
        onChange={this.updateNewMemberState}
        errors={this.state.errors} />
    )
  }
}

TeamPage.propTypes = {
  team: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  newMember: PropTypes.object
}

function mapStateToProps(state, ownProps) {
  return {
    team: state.project.team
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(projectActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamPage)
