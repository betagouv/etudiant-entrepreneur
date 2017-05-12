import React, { PropTypes } from 'react'
import Cleave from 'cleave.js/dist/cleave-react.min'
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap'

import ValidatedComponent from '../../common/ValidatedComponent'

const CommitteeForm = ({ committee, onDateChange, onDateInit, onlastApplicationDateInit, onChange, errors }) => {
  return (
    <form>
      <FormGroup className="required">
        <ControlLabel>Date du comité</ControlLabel>
        <ValidatedComponent error={errors.date}>
          <Cleave className="form-control"
            name="date"
            placeholder="JJ/MM/AAAA"
            options={{
              date: true,
              datePattern: ['d', 'm', 'Y']
            }}
            onChange={onDateChange}
            onInit={onDateInit} />
        </ValidatedComponent>
      </FormGroup>
      <FormGroup className="required">
        <ControlLabel>Dernier jour de dépôt des candidatures</ControlLabel>
        <ValidatedComponent error={errors.lastApplicationDate}>
          <Cleave className="form-control"
            name="lastApplicationDate"
            placeholder="JJ/MM/AAAA"
            options={{
              date: true,
              datePattern: ['d', 'm', 'Y']
            }}
            onChange={onDateChange}
            onInit={onlastApplicationDateInit} />
        </ValidatedComponent>
      </FormGroup>
      <FormGroup>
        <ControlLabel>Message affiché aux candidats</ControlLabel>
        <ValidatedComponent error={errors.message}>
          <FormControl componentClass="textarea" className="form-control" name="message" rows={3} placeholder="Message peronnalisé aux candidats sélectionnant votre PEPITE" onChange={onChange} value={committee.message} />
        </ValidatedComponent>
      </FormGroup>
    </form>
  )
}

CommitteeForm.propTypes = {
  committee: PropTypes.object.isRequired,
  onDateChange: PropTypes.func.isRequired,
  onDateInit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onlastApplicationDateInit: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

export default CommitteeForm
