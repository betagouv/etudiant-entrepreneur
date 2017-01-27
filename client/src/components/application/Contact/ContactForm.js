import React, { PropTypes } from 'react'
import { FormGroup, ControlLabel, FormControl, Radio, HelpBlock, Panel } from 'react-bootstrap'
import RadioGroup from '../../common/RadioGroup'
import ValidatedFormControl from '../../common/ValidatedFormControl'
import { isBeforeYearStartMonth, getCurrentYear } from '../../common/yearHelper'

function getGraduationQuestionAnswerText() {
  let graduateText, studentText
  if (isBeforeYearStartMonth()) {
    graduateText = "J'aurai fini ou arrêté mes études"
    studentText = "Je serai étudiant·e"
  }
  else {
    graduateText = "J'ai fini ou arrêté mes études"
    studentText = "Je suis étudiant·e"
  }
  return { graduateText, studentText }
}

const ContactForm = ({contact, errors, onChange}) => {
  let { graduateText, studentText } = getGraduationQuestionAnswerText()
  return (
    <form>
      <FormGroup className="required">
        <ControlLabel>Prénom</ControlLabel>
        <ValidatedFormControl name="firstname" type="text" placeholder="" onChange={onChange} value={contact.firstname} error={errors.firstname} />
      </FormGroup>
      <FormGroup className="required">
        <ControlLabel>Nom</ControlLabel>
        <ValidatedFormControl name="name" type="text" placeholder="" onChange={onChange} value={contact.name} error={errors.name} />
      </FormGroup>
      <FormGroup className="required">
        <ControlLabel>Email</ControlLabel>
        <ValidatedFormControl name="email" type="email" placeholder="" onChange={onChange} value={contact.email} error={errors.email} />
      </FormGroup>
      <FormGroup className="required">
        <ControlLabel>Téléphone mobile</ControlLabel>
        <ValidatedFormControl name="phone" type="text" placeholder="" onChange={onChange} value={contact.phone} error={errors.phone} />
      </FormGroup>
      <FormGroup className="required">
        <ControlLabel>En septembre {getCurrentYear()} :</ControlLabel>
        <RadioGroup name="situation" onChange={onChange} selectedValue={contact.situation} error={errors.situation}>
          <Radio value="graduate">{graduateText}</Radio>
          <Radio value="student">{studentText}</Radio>
        </RadioGroup>
      </FormGroup>
      <Panel bsStyle="info" className={(contact.situation == 'graduate') ? 'required' : 'required hidden'}>
        <div>Diplômé·e en 2016, si tu obtiens le statut étudiant·e-entrepreneur·e, tu devras t'inscrire  au <a target="_blank" href="http://www.pepite-france.fr/b-diplome-etudiant-entrepreneur-2">diplôme d’établissement étudiant-entrepreneur (D2E)</a> via ton Pepite.</div>
      </Panel>
      <FormGroup className="required">
        <ControlLabel>J'ai déjà obtenu le statut l'année dernière</ControlLabel>
        <RadioGroup name="isRenew" onChange={onChange} selectedValue={contact.isRenew} error={errors.isRenew}>
          <Radio value="true">Oui, il s'agit d'un renouvellement</Radio>
          <Radio value="false">Non</Radio>
        </RadioGroup>
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
