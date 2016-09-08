import React, {PropTypes} from 'react'
import { FormGroup, ControlLabel, FormControl, Radio, HelpBlock } from 'react-bootstrap'
import RadioGroup from '../../common/RadioGroup'
import ValidatedFormControl from '../../common/ValidatedFormControl'

const ProfileForm = ({profile, errors, onChange}) => {
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
      <FormGroup className="required">
        <ControlLabel>Étudiant en 2016 :</ControlLabel>
        <RadioGroup name="situation" onChange={onChange} selectedValue={profile.situation}>
          <Radio value="graduate">Je fini mes études avant décembre 2016</Radio>
          <Radio value="student">Je serai étudiant·e toute l'année universitaire 2016-2017</Radio>
        </RadioGroup>
        <HelpBlock>Affichée que si étudiant en 2016</HelpBlock>
      </FormGroup>
    </form>
  )
}

ProfileForm.propTypes = {
  profile: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object
}

export default ProfileForm
