import React, { PropTypes } from 'react'
import { FormGroup, ControlLabel, FormControl, Radio, HelpBlock, Button } from 'react-bootstrap'
import RadioGroup from '../../../common/RadioGroup'
import ValidatedFormControl from '../../../common/ValidatedFormControl'
import ValidatedComponent from '../../../common/ValidatedComponent'
import Textarea from 'react-textarea-autosize'

const CommitteeAnswerForm = ({committeeAnswer, errors, onChange, saveAnswer}) => {
  return (
    <form>
      <FormGroup className="required">
        <ControlLabel>Avis du comité:</ControlLabel>
        <RadioGroup name="status" onChange={onChange} selectedValue={committeeAnswer.status} error={errors.status}>
          <Radio value="D2E">Octroi du D2E et statut</Radio>
          <Radio value="SNEE">Statut seul</Radio>
          <Radio value="refused">Avis défavorable</Radio>
        </RadioGroup>
      </FormGroup>
      <FormGroup className="required">
        <ControlLabel>Avis du comité détaillé</ControlLabel>
        <ValidatedComponent error={errors.opinion}>
          <Textarea className="form-control" name="opinion" rows={5} placeholder="Avis du comité détaillé" onChange={onChange} value={committeeAnswer.opinion} />
        </ValidatedComponent>
      </FormGroup>
      <Button bsStyle="success" className="save" onClick={saveAnswer}>Enregistrer l'avis</Button>
    </form>
  )
}

CommitteeAnswerForm.propTypes = {
  committeeAnswer: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  saveAnswer: PropTypes.func.isRequired
}

export default CommitteeAnswerForm
