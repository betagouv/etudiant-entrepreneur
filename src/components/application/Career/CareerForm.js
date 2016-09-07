import React, {PropTypes} from 'react'
import { FormGroup, ControlLabel, FormControl, Radio, HelpBlock } from 'react-bootstrap'
import RadioGroup from '../../common/RadioGroup'
import ValidatedFormControl from '../../common/ValidatedFormControl'

const CareerForm = ({career, errors, onChange}) => {
  return (
    <form>
      <p>Mon Parcours</p>
      <div>Ici, je décris bientôt mon parcours</div>
    </form>
  )
}

CareerForm.propTypes = {
  career: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object
}

export default CareerForm
