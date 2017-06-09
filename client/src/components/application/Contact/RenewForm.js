import React, { PropTypes } from 'react'
import { FormGroup, ControlLabel, Panel, InputGroup, FormControl, HelpBlock, ButtonToolbar, Button, Glyphicon } from 'react-bootstrap'
import ValidatedComponent from '../../common/ValidatedComponent'
import ButtonWrapperComponent from '../../common/ButtonWrapperComponent'

const renewFromHeader = "Repartir de ma candidature de l'année passée (facultatif)"

const RenewForm = ({ isVisible, oldLink, error, onOldLinkChange, onCopyApplicationClick, toggleVisibility }) => {
  if (!isVisible) {
    return <Button bsStyle="primary" onClick={toggleVisibility}><Glyphicon glyph="plus" /> {renewFromHeader}</Button>
  }
  else {
    return (
      <Panel bsStyle="primary" header={renewFromHeader}>
        <form>
          <FormGroup>
            <ControlLabel>Lien de ma candidature de l'année passée</ControlLabel>
            <ValidatedComponent error={error}>
              <InputGroup>
                <InputGroup.Addon>{`${window.location.protocol}//`}</InputGroup.Addon>
                <FormControl name="oldLink" type="text" placeholder={`${window.location.host}/application/xxxxxxx`} onChange={onOldLinkChange} value={oldLink} />
              </InputGroup>
            </ValidatedComponent>
            <HelpBlock>Retrouve ce lien dans le mail de ta candidature de l'année passée</HelpBlock>
          </FormGroup>
          <ButtonToolbar>
            <button type="button" className="btn btn-success" disabled={!oldLink || !!error} onClick={onCopyApplicationClick}>Copier ma candidature</button>
            <button type="button" className="btn btn-warning" onClick={toggleVisibility}>Je n'ai pas le lien</button>
          </ButtonToolbar>
        </form>
      </Panel>
    )
  }
}

RenewForm.propTypes = {
  oldLink: PropTypes.string.isRequired,
  onOldLinkChange: PropTypes.func.isRequired,
  onCopyApplicationClick: PropTypes.func.isRequired,
  toggleVisibility: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
  error: PropTypes.string
}

export default RenewForm
