import React, {PropTypes} from 'react'
import { FormGroup, ControlLabel, FormControl, Button, HelpBlock } from 'react-bootstrap'
import ValidatedFormControl from '../../common/ValidatedFormControl'

const SaveForm = ({link, saveForm}) => {
  return (
    <form>
      <FormGroup>
        <ControlLabel>Lien vers ta candidature</ControlLabel>
        <ValidatedFormControl name="link" type="url" value={link} disabled={link.length == 0}/>
        <HelpBlock>Tu vas recevoir par mail un lien vers ta candidature pour la compléter ou la modifier plus tard</HelpBlock>
      </FormGroup>
    </form>
  )
}

SaveForm.propTypes = {
  link: PropTypes.string.isRequired,
  saveForm: PropTypes.func.isRequired
}

export default SaveForm
