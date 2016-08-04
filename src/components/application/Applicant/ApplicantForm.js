import React, {PropTypes} from 'react'
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap'

const ApplicantForm = ({applicant, onChange}) => {
  return (
    <form>
      <p>Mes Informations</p>
      <FormGroup>
        <ControlLabel>Nom</ControlLabel>
        <FormControl name="name" type="text" placeholder="" onChange={onChange} value={applicant.name}/>
      </FormGroup>
    </form>
  )
}

ApplicantForm.propTypes = {
  applicant: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}

export default ApplicantForm
