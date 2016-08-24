import React, {PropTypes} from 'react'
import { FormGroup, ControlLabel, FormControl, HelpBlock, Panel, Button } from 'react-bootstrap'
import ValidatedFormControl from '../../common/ValidatedFormControl'
import TeamMemberList from './TeamMemberList'
import TeamMemberAddForm from './TeamMemberAddForm'

const TeamForm = (props) => {
  return (
    <form>
      <TeamMemberList team={props.team}/>
      <TeamMemberAddForm {...props} />
    </form>
  )
}

TeamForm.propTypes = {
  team: PropTypes.array.isRequired,
  newMember: PropTypes.object.isRequired,
  addMember: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object
}

export default TeamForm
