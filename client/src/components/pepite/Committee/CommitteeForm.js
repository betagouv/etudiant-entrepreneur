import React, { PropTypes } from 'react'
import Cleave from 'cleave.js/dist/cleave-react.min'
import { FormGroup, ControlLabel } from 'react-bootstrap'

import ValidatedComponent from '../../common/ValidatedComponent'

const CommitteeForm = ({ committee, onDateChange, onDateInit, errors }) => {
  return (
    <FormGroup className="required">
      <ControlLabel>Date du comité</ControlLabel>
      <ValidatedComponent error={errors.date}>
        <Cleave className="form-control"
          name="birthDate"
          placeholder="JJ/MM/AAAA"
          options={{
            date: true,
            datePattern: ['d', 'm', 'Y']
          }}
          onChange={onDateChange}
          onInit={onDateInit} />
      </ValidatedComponent>
    </FormGroup>
  )
}

CommitteeForm.propTypes = {
  committee: PropTypes.object.isRequired,
  onDateChange: PropTypes.func.isRequired,
  onDateInit: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

export default CommitteeForm
