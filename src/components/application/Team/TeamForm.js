import React, {PropTypes} from 'react'
import { FormGroup, ControlLabel, FormControl, HelpBlock, Table, Panel, Button } from 'react-bootstrap'
import ValidatedFormControl from '../../common/ValidatedFormControl'
import TeamMemberList from './TeamMemberList'


const TeamForm = ({team, newMember, addMember, onChange, errors}) => {
  return (
    <form>
      <Panel header="Mon équipe">
        <TeamMemberList team={team}/>
      </Panel>
      <Panel header="Nouveau membre">
        <FormGroup>
          <ControlLabel>Prénom</ControlLabel>
          <ValidatedFormControl name="firstname" type="text" placeholder="prénom" onChange={onChange} value={newMember.firstname} error=  {errors.firstname}/>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Nom</ControlLabel>
          <ValidatedFormControl name="name" type="text" placeholder="nom" onChange={onChange} value={newMember.name}   error={errors.name}/>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Rôle</ControlLabel>
          <ValidatedFormControl name="role" type="text" placeholder="rôle" onChange={onChange} value={newMember.role}   error={errors.role}/>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Diplôme</ControlLabel>
          <ValidatedFormControl name="diploma" type="text" placeholder="diplôme" onChange={onChange} value={newMember.diploma}   error={errors.diploma}/>
        </FormGroup>
        <Button bsStyle="primary" onClick={addMember}>Ajouter</Button>
      </Panel>
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
