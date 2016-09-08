import React, {PropTypes} from 'react'
import { FormGroup, ControlLabel, FormControl, Radio, HelpBlock, Panel } from 'react-bootstrap'
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
      <FormGroup className="required">
        <ControlLabel>Lieu de naissance</ControlLabel>
        <ValidatedFormControl name="birthPlace" type="text" placeholder="ville de naissance" onChange={onChange} value={profile.birthPlace} error={errors.birthPlace}/>
      </FormGroup>
      <FormGroup className="required">
        <ControlLabel>Nationalité</ControlLabel>
        <RadioGroup name="nationality" onChange={onChange} selectedValue={profile.nationality}>
          <Radio value="fr">française</Radio>
          <Radio value="other">étrangère</Radio>
        </RadioGroup>
      </FormGroup>
      <FormGroup className={(profile.nationality == 'other') ? 'required' : 'required hidden'}>
        <ControlLabel>Précisez</ControlLabel>
        <ValidatedFormControl name="otherNationality" type="text" placeholder="nationalité" onChange={onChange} value={profile.otherNationality} error={errors.otherNationality}/>
      </FormGroup>
      <FormGroup>
        <ControlLabel>Identifiant national étudiant (INE)</ControlLabel>
        <ValidatedFormControl name="ine" type="text" placeholder="11 caractères" onChange={onChange} value={profile.ine} error={errors.ine}/>
        <HelpBlock>identifiant ou numéro national étudiant unique présent sur ma carte d’étudiant·e ou mes relevés de notes.</HelpBlock>
      </FormGroup>
      <Panel header="Mes coordonnées">
        <FormGroup className="required">
          <ControlLabel>Adresse postale</ControlLabel>
          <ValidatedFormControl name="address" type="text" placeholder="Adresse" onChange={onChange} value={profile.address} error={errors.address}/>
        </FormGroup>
        <FormGroup className="required">
          <ControlLabel>Code postal</ControlLabel>
          <ValidatedFormControl name="cp" type="text" placeholder="Code postal" onChange={onChange} value={profile.cp} error={errors.cp}/>
        </FormGroup>
        <FormGroup className="required">
          <ControlLabel>Ville</ControlLabel>
          <ValidatedFormControl name="city" type="text" placeholder="Ville" onChange={onChange} value={profile.city} error={errors.city}/>
        </FormGroup>
        <FormGroup className="required">
          <ControlLabel>Pays</ControlLabel>
          <ValidatedFormControl name="country" type="text" placeholder="Pays" onChange={onChange} value={profile.country} error={errors.country}/>
        </FormGroup>
      </Panel>
      <Panel header="Mes réseaux sociaux">
        <FormGroup>
          <ControlLabel>mon twitter</ControlLabel>
          <ValidatedFormControl name="twitter" type="url" placeholder="twitter" onChange={onChange} value={profile.twitter} error={errors.twitter}/>
        </FormGroup>
        <FormGroup>
          <ControlLabel>mon facebook</ControlLabel>
          <ValidatedFormControl name="facebook" type="url" placeholder="facebook" onChange={onChange} value={profile.facebook} error={errors.facebook}/>
        </FormGroup>
        <FormGroup>
          <ControlLabel>mon linkedin</ControlLabel>
          <ValidatedFormControl name="linkedin" type="url" placeholder="linkedin" onChange={onChange} value={profile.linkedin} error={errors.linkedin}/>
        </FormGroup>
        <FormGroup>
          <ControlLabel>mon viadeo</ControlLabel>
          <ValidatedFormControl name="viadeo" type="url" placeholder="viadeo" onChange={onChange} value={profile.viadeo} error={errors.viadeo}/>
        </FormGroup>
      </Panel>
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
