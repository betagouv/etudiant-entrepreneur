import React, {PropTypes} from 'react'
import { FormGroup, ControlLabel, FormControl, Radio, HelpBlock, Panel } from 'react-bootstrap'
import DatePicker from 'react-bootstrap-date-picker'
import RadioGroup from '../../common/RadioGroup'
import ValidatedComponent from '../../common/ValidatedComponent'
import ValidatedFormControl from '../../common/ValidatedFormControl'
import Textarea from 'react-textarea-autosize'
import {calendarProps} from '../../common/calendarHelper'
import {countries} from '../../common/ressources/countries'

const ProfileForm = ({profile, contact, errors, onChange, onDateChange}) => {
  return (
    <form>
      <FormGroup className="required">
        <ControlLabel>Genre</ControlLabel>
        <RadioGroup name="gender" onChange={onChange} selectedValue={profile.gender} error={errors.gender}>
          <Radio value="male">Homme</Radio>
          <Radio value="female">Femme</Radio>
        </RadioGroup>
      </FormGroup>
      <FormGroup className={(contact.situation == 'student') ? 'required' : 'required hidden'}>
        <ControlLabel>Étudiant en 2016 :</ControlLabel>
        <RadioGroup name="situation" onChange={onChange} selectedValue={profile.situation} error={errors.situation}>
          <Radio value="graduate">Je finis mes études avant fin décembre 2016</Radio>
          <Radio value="student">Je serai étudiant·e toute l'année universitaire 2016-2017</Radio>
        </RadioGroup>
      </FormGroup>
      <FormGroup className="required">
        <ControlLabel>Date de naissance</ControlLabel>
        <ValidatedComponent error={errors.birthDate}>
          <DatePicker value={profile.birthDate} onChange={onDateChange} {...calendarProps} />
        </ValidatedComponent>
      </FormGroup>
      <FormGroup className="required">
        <ControlLabel>Lieu de naissance</ControlLabel>
        <ValidatedFormControl name="birthPlace" type="text" placeholder="ville de naissance" onChange={onChange} value={profile.birthPlace} error={errors.birthPlace}/>
      </FormGroup>
      <FormGroup className="required">
        <ControlLabel>Pays de votre nationalité</ControlLabel>
        <ValidatedFormControl name="nationality" componentClass="select" onChange={onChange} value={profile.nationality} error={errors.nationality}>
          <option value="" disabled>Sélectionner</option>
          {Object.keys(countries).map((key, index) => { return (<option key={index + 1} value={key}>{countries[key]}</option>) }) }
        </ValidatedFormControl>
      </FormGroup>
      <FormGroup>
        <ControlLabel>Identifiant national étudiant (INE)</ControlLabel>
        <ValidatedFormControl name="ine" type="text" placeholder="11 caractères" onChange={onChange} value={profile.ine} error={errors.ine}/>
        <HelpBlock>identifiant ou numéro national étudiant unique présent sur ma carte d’étudiant·e ou mes relevés de notes.</HelpBlock>
      </FormGroup>
      <FormGroup className="required">
        <ControlLabel>Qu'attends-tu du statut national étudiant·e-entrepreneur·e ?</ControlLabel>
        <ValidatedComponent error={errors.motivation}>
          <Textarea className="form-control" name="motivation" rows={5} placeholder="motivations à candidater au statut national étudiant·e-entrepreneur·e" onChange={onChange} value={profile.motivation}/>
        </ValidatedComponent>
      </FormGroup>
      <Panel header="Mes coordonnées pérennes dans le temps">
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
          <ValidatedFormControl name="country" componentClass="select" onChange={onChange} value={profile.country} error={errors.country}>
            <option value="" disabled>Sélectionner</option>
            {Object.keys(countries).map((key, index) => { return (<option key={index + 1} value={key}>{countries[key]}</option>) }) }
          </ValidatedFormControl>
        </FormGroup>
      </Panel>
      <Panel header="Mon activité">
        <FormGroup className="required">
          <ControlLabel>J'occupe actuellement une activité professionnelle à temps complet ou partiel</ControlLabel>
          <RadioGroup name="hasActivity" onChange={onChange} selectedValue={profile.hasActivity} error={errors.hasActivity}>
            <Radio value="true">oui</Radio>
            <Radio value="false">non</Radio>
          </RadioGroup>
        </FormGroup>
        <FormGroup className={(profile.hasActivity == 'true') ? '' : 'hidden'}>
          <ControlLabel>Activité</ControlLabel>
          <ValidatedFormControl name="activity" type="text" placeholder="nature de l'activité (informatique, droit...)" onChange={onChange} value={profile.activity} error={errors.activity}/>
        </FormGroup>
        <FormGroup className="required">
          <ControlLabel>Je suis à la recherche d'un emploi</ControlLabel>
          <RadioGroup name="isUnemployed" onChange={onChange} selectedValue={profile.isUnemployed} error={errors.isUnemployed}>
            <Radio value="true">oui</Radio>
            <Radio value="false">non</Radio>
          </RadioGroup>
        </FormGroup>
        <Panel className={(profile.isUnemployed == 'true') ? '' : 'hidden'}>
          <div>Si tu es actuellement demandeur d'emploi, pense à intégrer le D2E dans <a target="_blank" href="https://www.service-public.fr/particuliers/vosdroits/F14926">ton projet personalisé de retour à l'emploi</a> avec ton conseiller Pôle emploi.</div>
        </Panel>
        <FormGroup className="required">
          <ControlLabel>Je suis autoentrepreneur·e</ControlLabel>
          <RadioGroup name="isFreelance" onChange={onChange} selectedValue={profile.isFreelance} error={errors.isFreelance}>
            <Radio value="true">oui</Radio>
            <Radio value="false">non</Radio>
          </RadioGroup>
        </FormGroup>
        <FormGroup className={(contact.situation == 'student') ? 'required' : 'required hidden'}>
          <ControlLabel>Je poursuis une formation en alternance</ControlLabel>
          <RadioGroup name="isPartTime" onChange={onChange} selectedValue={profile.isPartTime} error={errors.isPartTime}>
            <Radio value="true">oui</Radio>
            <Radio value="false">non</Radio>
          </RadioGroup>
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
