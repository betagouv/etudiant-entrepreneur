import React, { PropTypes } from 'react'
import { FormGroup, ControlLabel, Button } from 'react-bootstrap'
import ValidatedFormControl from '../../../common/ValidatedFormControl'
import ValidatedComponent from '../../../common/ValidatedComponent'
import Textarea from 'react-textarea-autosize'

const DropApplicationForm = ({reason, error, onChange, dropApplication}) => {
  return (
    <form>
      <FormGroup className="required">
        <ControlLabel>Raison de l'abandon</ControlLabel>
        <ValidatedComponent error={error}>
          <Textarea className="form-control" name="reason" rows={5} placeholder="raison" onChange={onChange} value={reason} />
        </ValidatedComponent>
      </FormGroup>
      <Button bsStyle="danger" onClick={dropApplication}>Confirmer l'abandon</Button>
    </form>
  )
}

DropApplicationForm.propTypes = {
  reason: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.object,
  dropApplication: PropTypes.func.isRequired
}

export default DropApplicationForm
