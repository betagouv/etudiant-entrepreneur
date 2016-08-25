import React, {PropTypes} from 'react'
import { FormGroup, ControlLabel, FormControl, Button, HelpBlock } from 'react-bootstrap'
import ValidatedFormControl from '../../common/ValidatedFormControl'

const SaveForm = ({link, saveForm, errors, onChange}) => {
  return (
    <form>
      <FormGroup>
        <ControlLabel>Lien vers ta cadidature</ControlLabel>
        <ValidatedFormControl name="link" type="url" placeholder="Sauvegarde pour obtenir le lien" onChange={onChange} value={link} disabled={link.length == 0}/>
        <HelpBlock>lien pour modifier ta candidature</HelpBlock>
      </FormGroup>
      <Button bsStyle="primary" className="save" onClick={saveForm}>Sauvegarder</Button>
    </form>
  )
}

SaveForm.propTypes = {
  link: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  saveForm: PropTypes.func.isRequired,
  errors: PropTypes.object
}

export default SaveForm
