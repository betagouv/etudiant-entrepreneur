import React, {PropTypes} from 'react'
import { FormGroup, ControlLabel, FormControl, HelpBlock, Panel, Button, Radio } from 'react-bootstrap'
import ValidatedFormControl from '../../common/ValidatedFormControl'
import RadioGroup from '../../common/RadioGroup'
import TeamMemberList from './TeamMemberList'
import TeamMemberAddForm from './TeamMemberAddForm'

const TeamForm = (props) => {
  return (
    <form>
      <p>Mon Équipe</p>
      <FormGroup className="required">
        <ControlLabel>Ton projet est-il individuel ou collectif?</ControlLabel>
        <RadioGroup name="teamType" onChange={props.projectOnChange} selectedValue={props.project.teamType}>
          <Radio value="alone">Individuel</Radio>
          <Radio value="collective">Collectif</Radio>
        </RadioGroup>
      </FormGroup>
      <div className={(props.project.teamType == 'collective') ? '' : ' hidden'}>
        <TeamMemberList team={props.team} onMemberDelete={props.onMemberDelete}/>
        <TeamMemberAddForm {...props} />
      </div>
    </form>
  )
}

TeamForm.propTypes = {
  team: PropTypes.array.isRequired,
  project: PropTypes.object.isRequired,
  newMember: PropTypes.object.isRequired,
  addMember: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  projectOnChange: PropTypes.func.isRequired,
  onMemberDelete: PropTypes.func.isRequired,
  errors: PropTypes.object
}

export default TeamForm
