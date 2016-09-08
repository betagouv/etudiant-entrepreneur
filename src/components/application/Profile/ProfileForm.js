import React, {PropTypes} from 'react'
import { FormGroup, ControlLabel, FormControl, Radio, HelpBlock } from 'react-bootstrap'
import DatePicker from 'react-bootstrap-date-picker'
import RadioGroup from '../../common/RadioGroup'
import ValidatedFormControl from '../../common/ValidatedFormControl'

const ProfileForm = ({profile, contact, errors, onChange, onDateChange}) => {
  return (
    <form>
      <p>Mon Profil</p>
      <FormGroup className="required">
        <ControlLabel>Genre</ControlLabel>
        <RadioGroup name="gender" onChange={onChange} selectedValue={profile.gender}>
          <Radio value="male">Homme</Radio>
          <Radio value="female">Femme</Radio>
        </RadioGroup>
      </FormGroup>
      <FormGroup className="required" className={(contact.situation == 'student') ? 'required' : 'required hidden'}>
        <ControlLabel>Étudiant en 2016 :</ControlLabel>
        <RadioGroup name="situation" onChange={onChange} selectedValue={profile.situation}>
          <Radio value="graduate">Je fini mes études avant décembre 2016</Radio>
          <Radio value="student">Je serai étudiant·e toute l'année universitaire 2016-2017</Radio>
        </RadioGroup>
      </FormGroup>
      <FormGroup className="required">
        <ControlLabel>Date de naissance</ControlLabel>
        <DatePicker value={profile.birthDate} showYearDropdown onChange={onDateChange} dateFormatCalendar="MMMM" />
      </FormGroup>
    </form>
  )
}

ProfileForm.propTypes = {
  profile: PropTypes.object.isRequired,
  contact: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onDateChange: PropTypes.func.isRequired,
  errors: PropTypes.object
}

export default ProfileForm
