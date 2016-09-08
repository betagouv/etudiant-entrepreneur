import React, {PropTypes} from 'react'
import { FormGroup, ControlLabel, FormControl, Radio, HelpBlock, Panel } from 'react-bootstrap'
import Datetime from 'react-datetime'
import RadioGroup from '../../common/RadioGroup'
import ValidatedFormControl from '../../common/ValidatedFormControl'

const CareerForm = ({career, errors, onChange, onBacChange}) => {
  return (
    <form>
      <p>Mon Parcours</p>
      <FormGroup className="required">
        <ControlLabel>Mon baccalauréat ou son équivalence en niveau</ControlLabel>
        <RadioGroup name="isOriginal" onChange={onBacChange} selectedValue={career.bac.isOriginal}>
          <Radio value="true">Je suis lauréat du baccalauréat</Radio>
          <Radio value="false">J'ai obtenu son équivalence en niveau</Radio>
        </RadioGroup>
      </FormGroup>
      <FormGroup className="required">
        <ControlLabel>Lieu d'obtention</ControlLabel>
        <RadioGroup name="country" onChange={onBacChange} selectedValue={career.bac.country}>
          <Radio value="france">en France</Radio>
          <Radio value="foreign">à l'étranger</Radio>
        </RadioGroup>
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
      <Panel Header="Mon parcours de formation dans l'enseignement supérieur">

      </Panel>
    </form>
  )
}

CareerForm.propTypes = {
  career: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onBacChange: PropTypes.func.isRequired,
  errors: PropTypes.object
}

export default CareerForm
