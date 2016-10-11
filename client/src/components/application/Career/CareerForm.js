import React, {PropTypes} from 'react'
import { FormGroup, ControlLabel, FormControl, Radio, HelpBlock, Panel } from 'react-bootstrap'
import RadioGroup from '../../common/RadioGroup'
import ValidatedFormControl from '../../common/ValidatedFormControl'
import {diplomas} from './diplomas'
import {countries} from '../../common/ressources/countries'
import {getDescYearList, getUniversityYear} from '../../common/yearHelper'
import EntrepreneurshipPanel from './EntrepreneurshipPanel'

function getCurrentUniversityYear() {
  return (getUniversityYear(new Date().getFullYear()))
}

function getLastDiplomaHeader(situation) {
  if (situation == 'student') {
    return ("Mon inscription dans l'enseignement supérieur sur l'année " + getCurrentUniversityYear())
  }
  return ("Mon dernier diplôme")
}

const last70YearsList = getDescYearList(new Date().getFullYear(), 70)

const CareerForm = ({career, contact, tutorErrors, bacErrors, diplomaErrors, onTutorChange, onDiplomaChange, onBacChange, onEntrepreneurshipChange}) => {
  return (
    <form>
      <p>Mon Parcours</p>
      <Panel header="Mon responsable pédagogique" className={(contact.situation == 'student') ? 'required' : 'required hidden'}>
        <Panel>
          <div>Enseignant·e dans la formation dans laquelle je suis inscrit·e pour l'année universitaire {getCurrentUniversityYear()}.</div>
        </Panel>
        <FormGroup className="required">
          <ControlLabel>Nom</ControlLabel>
          <ValidatedFormControl name="name" type="text" placeholder="nom" onChange={onTutorChange} value={career.tutor.name} error={tutorErrors.name}/>
        </FormGroup>
        <FormGroup className="required">
          <ControlLabel>Prénom</ControlLabel>
          <ValidatedFormControl name="firstname" type="text" placeholder="prénom" onChange={onTutorChange} value={career.tutor.firstname} error={tutorErrors.firstname}/>
        </FormGroup>
        <FormGroup className="required">
          <ControlLabel>Discipline</ControlLabel>
          <ValidatedFormControl name="skill" type="text" placeholder="discipline" onChange={onTutorChange} value={career.tutor.skill} error={tutorErrors.skill}/>
        </FormGroup>
        <FormGroup className="required">
          <ControlLabel>Email</ControlLabel>
          <ValidatedFormControl name="email" type="email" placeholder="email" onChange={onTutorChange} value={career.tutor.email} error={tutorErrors.email}/>
        </FormGroup>
      </Panel>
      <Panel header="Mon baccalauréat ou son équivalence en niveau">
        <FormGroup className="required">
          <RadioGroup name="isOriginal" onChange={onBacChange} selectedValue={career.bac.isOriginal} error={bacErrors.isOriginal}>
            <Radio value="true">Je suis lauréat·e du baccalauréat</Radio>
            <Radio value="false">J'ai obtenu son équivalence en niveau</Radio>
          </RadioGroup>
        </FormGroup>
        <FormGroup className="required">
          <ControlLabel>Pays d'obtention</ControlLabel>
          <ValidatedFormControl name="country" componentClass="select" onChange={onBacChange} value={career.bac.country} error={bacErrors.country}>
            <option value="" disabled>Sélectionner</option>
            {Object.keys(countries).map((key, index) => { return (<option key={index + 1} value={key}>{countries[key]}</option>) }) }
          </ValidatedFormControl>
        </FormGroup>
        <FormGroup className="required">
          <ControlLabel>Année d'obtention</ControlLabel>
          <ValidatedFormControl name="year" componentClass="select" onChange={onBacChange} value={career.bac.year} error={bacErrors.year}>
            <option value="" disabled>Sélectionner</option>
            {last70YearsList.map((year, index) => { return (<option key={index + 1} value={year}>{year}</option>) }) }
          </ValidatedFormControl>
        </FormGroup>
        <FormGroup  className={(career.bac.isOriginal == 'true') ? 'required' : 'required hidden'}>
          <ControlLabel>Type de baccalauréat</ControlLabel>
          <RadioGroup name="type" onChange={onBacChange} selectedValue={career.bac.type} error={bacErrors.type}>
            <Radio value="general">général</Radio>
            <Radio value="tech">technologique</Radio>
            <Radio value="pro">professionnel</Radio>
          </RadioGroup>
        </FormGroup>
        <FormGroup className={(career.bac.isOriginal == 'false') ? 'required' : 'required hidden'}>
          <ControlLabel>Nom de l'équivalence</ControlLabel>
          <ValidatedFormControl name="type" type="text" placeholder="nom" onChange={onBacChange} value={career.bac.type} error={bacErrors.type}/>
        </FormGroup>
        <FormGroup  className={(career.bac.isOriginal == 'true') ? '' : 'hidden'}>
          <ControlLabel>Série</ControlLabel>
          <ValidatedFormControl name="stream" type="text" placeholder="S, L..." onChange={onBacChange} value={career.bac.stream} error={bacErrors.stream}/>
        </FormGroup>
        <FormGroup className="required">
          <ControlLabel>Établissement</ControlLabel>
          <ValidatedFormControl name="establishment" type="text" placeholder="établissement" onChange={onBacChange} value={career.bac.establishment} error={bacErrors.establishment}/>
        </FormGroup>
        <FormGroup className="required">
          <ControlLabel>Ville</ControlLabel>
          <ValidatedFormControl name="city" type="text" placeholder="ville" onChange={onBacChange} value={career.bac.city} error={bacErrors.city}/>
        </FormGroup>
      </Panel>
      <Panel header={getLastDiplomaHeader(contact.situation)}>
        <FormGroup className="required">
          <ControlLabel>Année universitaire</ControlLabel>
          <ValidatedFormControl name="year" componentClass="select" onChange={onDiplomaChange} value={career.diploma.year} error={diplomaErrors.year}>
            <option value="" disabled>Sélectionner</option>
            {last70YearsList.map((year, index) => { return (<option key={index + 1} value={getUniversityYear(year)}>{getUniversityYear(year)}</option>) }) }
          </ValidatedFormControl>
        </FormGroup>
        <FormGroup className="required">
          <ControlLabel>Type de formation / diplôme</ControlLabel>
          <ValidatedFormControl name="type" componentClass="select" onChange={onDiplomaChange} value={career.diploma.type} error={diplomaErrors.type}>
            <option value="" disabled>Sélectionner</option>
            {diplomas.map((diploma, index) => { return (<option key={index + 1} value={index + 1}>{diploma}</option>) }) }
            <option value="99">Autre</option>
          </ValidatedFormControl>
        </FormGroup>
        <FormGroup className="required">
          <ControlLabel>Libellé de la formation / diplôme</ControlLabel>
          <ValidatedFormControl name="name" type="text" placeholder="nom" onChange={onDiplomaChange} value={career.diploma.name} error={diplomaErrors.name}/>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Dominante disciplinaire</ControlLabel>
          <RadioGroup name="sector" onChange={onDiplomaChange} selectedValue={career.diploma.sector}>
            <Radio value="law">Droit, sciences politiques, sciences économiques, sciences de gestion, AES</Radio>
            <Radio value="letter">Lettres, art, langues, sciences humaines</Radio>
            <Radio value="science">Sciences, sciences de l’ingénieur, production</Radio>
            <Radio value="sport">STAPS</Radio>
            <Radio value="health">Santé, paramédical et social</Radio>
          </RadioGroup>
        </FormGroup>
        <FormGroup className="required">
          <ControlLabel>Établissement et composante</ControlLabel>
          <ValidatedFormControl name="establishment" type="text" placeholder="établissement" onChange={onDiplomaChange} value={career.diploma.establishment} error={diplomaErrors.establishment}/>
        </FormGroup>
        <FormGroup className="required">
          <ControlLabel>Ville de formation</ControlLabel>
          <ValidatedFormControl name="city" type="text" placeholder="ville" onChange={onDiplomaChange} value={career.diploma.city} error={diplomaErrors.city}/>
        </FormGroup>
      </Panel>
      <EntrepreneurshipPanel entrepreneurship={career.entrepreneurship} onEntrepreneurshipChange={onEntrepreneurshipChange}/>
    </form>
  )
}

CareerForm.propTypes = {
  career: PropTypes.object.isRequired,
  contact: PropTypes.object.isRequired,
  onTutorChange: PropTypes.func.isRequired,
  onDiplomaChange: PropTypes.func.isRequired,
  onBacChange: PropTypes.func.isRequired,
  onEntrepreneurshipChange: PropTypes.func.isRequired,
  tutorErrors: PropTypes.object,
  bacErrors: PropTypes.object,
  diplomaErrors: PropTypes.object,
}

export default CareerForm
