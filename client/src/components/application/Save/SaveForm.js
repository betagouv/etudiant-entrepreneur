import React, {PropTypes} from 'react'
import { FormGroup, ControlLabel, FormControl, Button, HelpBlock } from 'react-bootstrap'
import ValidatedFormControl from '../../common/ValidatedFormControl'

const SaveForm = ({link, saveForm, errors, onChange}) => {
  return (
    <form>
      <FormGroup>
        <ControlLabel>Lien vers ta candidature</ControlLabel>
        <ValidatedFormControl name="link" type="url" placeholder="Clique sur sauvegarde pour obtenir un lien" onChange={onChange} value={link} disabled={link.length == 0}/>
        <HelpBlock>Tu vas recevoir un lien vers ta candidature pour la compléter ou la modifier quand tu veux</HelpBlock>
      </FormGroup>
      <Button bsStyle="success" className="save" onClick={saveForm}>Sauvegarder</Button>
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
