import React, {PropTypes} from 'react'
import { FormGroup, ControlLabel, FormControl, Radio, HelpBlock, Panel } from 'react-bootstrap'
import RadioGroup from '../../common/RadioGroup'
import ValidatedFormControl from '../../common/ValidatedFormControl'
import {diplomas} from './diplomas'
import {countries} from '../../common/ressources/countries'

const CareerForm = ({career, errors, onTutorChange, onDiplomaChange, onBacChange}) => {
  return (
    <form>
      <p>Mon Parcours</p>
      <Panel header="Mon responsable pédagogique">
        <FormGroup className="required">
          <ControlLabel>Nom</ControlLabel>
          <ValidatedFormControl name="name" type="text" placeholder="nom" onChange={onTutorChange} value={career.tutor.name} error={errors.tutor.name}/>
        </FormGroup>
        <FormGroup className="required">
          <ControlLabel>Prénom</ControlLabel>
          <ValidatedFormControl name="firstname" type="text" placeholder="prénom" onChange={onTutorChange} value={career.tutor.firstname} error={errors.tutor.firstname}/>
        </FormGroup>
        <FormGroup className="required">
          <ControlLabel>Email</ControlLabel>
          <ValidatedFormControl name="email" type="email" placeholder="nom" onChange={onTutorChange} value={career.tutor.email} error={errors.tutor.email}/>
        </FormGroup>
      </Panel>
      <Panel header="Mon baccalauréat ou son équivalence en niveau">
        <FormGroup className="required">
          <RadioGroup name="isOriginal" onChange={onBacChange} selectedValue={career.bac.isOriginal}>
            <Radio value="true">Je suis lauréat·e du baccalauréat</Radio>
            <Radio value="false">J'ai obtenu son équivalence en niveau</Radio>
          </RadioGroup>
        </FormGroup>
        <FormGroup className="required">
          <ControlLabel>Pays d'obtention</ControlLabel>
          <ValidatedFormControl name="country" componentClass="select" onChange={onBacChange} value={career.bac.country} error={errors.bac.country}>
            <option value="" disabled>Sélectionner</option>
            {Object.keys(countries).map((key, index) => { return (<option key={index + 1} value={key}>{countries[key]}</option>) }) }
          </ValidatedFormControl>
        </FormGroup>
        <FormGroup className="required">
          <ControlLabel>Année d'obtention</ControlLabel>
          <ValidatedFormControl name="year" type="text" placeholder="AAAA" onChange={onBacChange} value={career.bac.year} error={errors.bac.year}/>
        </FormGroup>
        <FormGroup  className={(career.bac.isOriginal == 'true') ? 'required' : 'required hidden'}>
          <ControlLabel>Type de baccalauréat</ControlLabel>
          <RadioGroup name="type" onChange={onBacChange} selectedValue={career.bac.type}>
            <Radio value="general">général</Radio>
            <Radio value="tech">technologique</Radio>
            <Radio value="pro">professionnel</Radio>
          </RadioGroup>
        </FormGroup>
        <FormGroup className={(career.bac.isOriginal == 'false') ? 'required' : 'required hidden'}>
          <ControlLabel>Type d'équivalence</ControlLabel>
          <ValidatedFormControl name="type" type="text" placeholder="type?" onChange={onBacChange} value={career.bac.type} error={errors.bac.type}/>
        </FormGroup>
        <FormGroup  className={(career.bac.isOriginal == 'true') ? '' : 'hidden'}>
          <ControlLabel>Série</ControlLabel>
          <ValidatedFormControl name="stream" type="text" placeholder="S, L..." onChange={onBacChange} value={career.bac.stream} error={errors.bac.stream}/>
        </FormGroup>
        <FormGroup className="required">
          <ControlLabel>Établissement</ControlLabel>
          <ValidatedFormControl name="establishment" type="text" placeholder="établissement" onChange={onBacChange} value={career.bac.establishment} error={errors.bac.establishment}/>
        </FormGroup>
        <FormGroup className="required">
          <ControlLabel>Ville</ControlLabel>
          <ValidatedFormControl name="city" type="text" placeholder="ville" onChange={onBacChange} value={career.bac.city} error={errors.bac.city}/>
        </FormGroup>
      </Panel>
      <Panel header="Mon parcours de formation dans l'enseignement supérieur">
        <FormGroup className="required">
          <ControlLabel>Année universitaire</ControlLabel>
          <ValidatedFormControl name="year" type="text" placeholder="AAAA" onChange={onDiplomaChange} value={career.diploma.year} error={errors.diploma.year}/>
        </FormGroup>
        <FormGroup className="required">
          <ControlLabel>Type de formation / diplôme</ControlLabel>
          <ValidatedFormControl name="type" componentClass="select" onChange={onDiplomaChange} value={career.diploma.type} error={errors.diploma.type}>
            <option value="0" disabled>Sélectionner</option>
            {diplomas.map((diploma, index) => { return (<option key={index + 1} value={index + 1}>{diploma}</option>) }) }
            <option value="99">Autre</option>
          </ValidatedFormControl>
        </FormGroup>
        <FormGroup className="required">
          <ControlLabel>Libellé de la formation / diplôme</ControlLabel>
          <ValidatedFormControl name="name" type="text" placeholder="nom" onChange={onDiplomaChange} value={career.diploma.name} error={errors.diploma.name}/>
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
          <ValidatedFormControl name="establishment" type="text" placeholder="établissement" onChange={onDiplomaChange} value={career.diploma.establishment} error={errors.diploma.establishment}/>
        </FormGroup>
        <FormGroup className="required">
          <ControlLabel>Ville de formation</ControlLabel>
          <ValidatedFormControl name="city" type="text" placeholder="ville" onChange={onDiplomaChange} value={career.diploma.city} error={errors.diploma.city}/>
        </FormGroup>
      </Panel>
    </form>
  )
}

CareerForm.propTypes = {
  career: PropTypes.object.isRequired,
  onTutorChange: PropTypes.func.isRequired,
  onDiplomaChange: PropTypes.func.isRequired,
  onBacChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
}

export default CareerForm
