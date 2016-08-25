import React, {PropTypes} from 'react'
import { FormGroup, ControlLabel, FormControl, Button, HelpBlock } from 'react-bootstrap'
import ValidatedFormControl from '../../common/ValidatedFormControl'

const ContactForm = ({contact, errors, onChange}) => {
  return (
    <form>
      <p>Mes Informations</p>
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
      <FormGroup className="required">
        <ControlLabel>Téléphone</ControlLabel>
        <ValidatedFormControl name="phone" type="text" placeholder="" onChange={onChange} value={contact.phone} error={errors.phone}/>
      </FormGroup>
    </form>
  )
}

ContactForm.propTypes = {
  contact: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object
}

export default ContactForm
