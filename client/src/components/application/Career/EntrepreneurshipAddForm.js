import React, {PropTypes} from 'react'
import { FormGroup, ControlLabel, FormControl, HelpBlock, Panel, Button, Radio } from 'react-bootstrap'
import RadioGroup from '../../common/RadioGroup'
import ValidatedFormControl from '../../common/ValidatedFormControl'
import EntrepreneurshipList from './EntrepreneurshipList'
import {getDescYearList} from '../../common/yearHelper'

const last70YearsList = getDescYearList(new Date().getFullYear(), 70)

const EntrepreneurshipAddForm = ({newEntrepreneurship, onEntrepreneurshipAdded, onChange, errors}) => {
  return (
    <Panel bsStyle="primary" header="Nouvelle expérience">
      <FormGroup className="required">
        <ControlLabel>Nom</ControlLabel>
        <ValidatedFormControl name="name" type="text" placeholder="Ex: concours, hackathon..." onChange={onChange} value={newEntrepreneurship.name} error={errors.name}/>
      </FormGroup>
      <FormGroup className="required">
        <ControlLabel>Année</ControlLabel>
        <ValidatedFormControl name="year" componentClass="select" onChange={onChange} value={newEntrepreneurship.year} error={errors.year}>
            <option value="" disabled>Sélectionner</option>
            {last70YearsList.map((year, index) => { return (<option key={index + 1} value={year}>{year}</option>) }) }
        </ValidatedFormControl>
      </FormGroup>
      <FormGroup className="required">
        <ControlLabel>Description</ControlLabel>
        <ValidatedFormControl name="desc" rows="3" componentClass="textarea" placeholder="description" onChange={onChange} value={newEntrepreneurship.desc} error={errors.desc}/>
      </FormGroup>
      <Button bsStyle="primary" className="add-entrepreneurship" onClick={onEntrepreneurshipAdded}><span className="glyphicon glyphicon-plus"></span>  Ajouter {newEntrepreneurship.firstname} à mon projet</Button>
    </Panel>
  )
}

EntrepreneurshipAddForm.propTypes = {
  newEntrepreneurship: PropTypes.object.isRequired,
  onEntrepreneurshipAdded: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

export default EntrepreneurshipAddForm
