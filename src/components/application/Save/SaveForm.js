import React, {PropTypes} from 'react'
import { FormGroup, ControlLabel, FormControl, Button, HelpBlock } from 'react-bootstrap'
import ValidatedFormControl from '../../common/ValidatedFormControl'

const SaveForm = ({contact, saveForm, errors, onChange}) => {
  return (
    <form>
      <FormGroup className="required">
        <ControlLabel>Prénom</ControlLabel>
        <ValidatedFormControl name="firstname" type="text" placeholder="" onChange={onChange} value={contact.firstname} error={errors.firstname}/>
      </FormGroup>
      <FormGroup className="required">
        <ControlLabel>Nom</ControlLabel>
        <ValidatedFormControl name="name" type="text" placeholder="" onChange={onChange} value={contact.name} error={errors.name}/>
      </FormGroup>
      <FormGroup className="required">
        <ControlLabel>Email</ControlLabel>
        <ValidatedFormControl name="email" type="email" placeholder="" onChange={onChange} value={contact.email} error={errors.email}/>
      </FormGroup>
      <FormGroup>
        <ControlLabel>Lien vers ta cadidature</ControlLabel>
        <ValidatedFormControl name="link" type="url" placeholder="Sauvegarde pour obtenir le lien" onChange={onChange} value={contact.link} disabled={contact.link.length == 0}/>
        <HelpBlock>lien pour modifier ta candidature</HelpBlock>
      </FormGroup>
      <Button bsStyle="primary" className="save" onClick={saveForm}>Sauvegarder</Button>
    </form>
  )
}

SaveForm.propTypes = {
  contact: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  saveForm: PropTypes.func.isRequired,
  errors: PropTypes.object
}

export default SaveForm
