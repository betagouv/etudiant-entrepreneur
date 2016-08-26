import React, {PropTypes} from 'react'
import { FormGroup, ControlLabel, FormControl, HelpBlock, Panel, Button } from 'react-bootstrap'
import ValidatedFormControl from '../../common/ValidatedFormControl'
import TeamMemberList from './TeamMemberList'
import conditionAddMember from './ConditionAddMember'

const TeamMemberAddForm = ({team, newMember, addMember, onChange, errors}) => {
  return (
    <Panel header="Nouveau membre">
      <FormGroup className="required">
        <ControlLabel>Prénom</ControlLabel>
        <ValidatedFormControl name="firstname" type="text" placeholder="prénom" onChange={onChange} value={newMember.firstname} error=  {errors.firstname}/>
      </FormGroup>
      <FormGroup className="required">
        <ControlLabel>Nom</ControlLabel>
        <ValidatedFormControl name="name" type="text" placeholder="nom" onChange={onChange} value={newMember.name}   error={errors.name}/>
      </FormGroup>
      <FormGroup className="required">
        <ControlLabel>Rôle</ControlLabel>
        <ValidatedFormControl name="role" type="text" placeholder="rôle" onChange={onChange} value={newMember.role}   error={errors.role}/>
      </FormGroup>
      <FormGroup className="required">
        <ControlLabel>Diplôme</ControlLabel>
        <ValidatedFormControl name="diploma" type="text" placeholder="diplôme" onChange={onChange} value={newMember.diploma}   error={errors.diploma}/>
      </FormGroup>
      <FormGroup className="required">
        <ControlLabel>Email</ControlLabel>
        <ValidatedFormControl name="email" type="email" placeholder="email" onChange={onChange} value={newMember.email} error={errors.email}/>
      </FormGroup>
      <Button bsStyle="primary" onClick={addMember}><span className="glyphicon glyphicon-plus"></span>  Ajouter {newMember.firstname} à mon projet</Button>
    </Panel>
  )
}

TeamMemberAddForm.propTypes = {
  team: PropTypes.array.isRequired,
  newMember: PropTypes.object.isRequired,
  addMember: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object
}

export default conditionAddMember(TeamMemberAddForm)
