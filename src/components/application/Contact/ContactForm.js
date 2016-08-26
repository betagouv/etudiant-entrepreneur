import React, {PropTypes} from 'react'
import { FormGroup, ControlLabel, FormControl, Radio, HelpBlock } from 'react-bootstrap'
import RadioGroup from '../../common/RadioGroup'
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
      <FormGroup className="required">
        <ControlLabel>En septembre 2016 :</ControlLabel>
        <RadioGroup name="situation" onChange={onChange} selectedValue={contact.situation}>
          <Radio value="graduate">J'aurai fini ou arrêté mes études</Radio>
          <Radio value="student">Je serai étudiant·e</Radio>
        </RadioGroup>
        <HelpBlock>Ne pas prendre en compte l'inscription au diplôme étudiant·e entrepreneur·e (D2E)</HelpBlock>
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
