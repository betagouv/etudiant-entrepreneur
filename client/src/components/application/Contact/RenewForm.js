import React, { PropTypes } from 'react'
import { FormGroup, ControlLabel, Panel, InputGroup, FormControl, HelpBlock } from 'react-bootstrap'
import ValidatedComponent from '../../common/ValidatedComponent'
import ButtonWrapperComponent from '../../common/ButtonWrapperComponent'

const RenewForm = ({ oldLink, error, onOldLinkChange, onCopyApplicationClick }) => {
  return (
    <ButtonWrapperComponent showButtonText="Repartir de ma candidature de l'année passée" isChildrenShown={false} glyph="plus">
      <Panel bsStyle="primary" header="Repartir de ma candidature de l'année passée">
        <form>
          <FormGroup>
            <ControlLabel>Lien de ta candidature</ControlLabel>
            <ValidatedComponent error={error}>
              <InputGroup>
                <InputGroup.Addon>{`${window.location.protocol}//`}</InputGroup.Addon>
                <FormControl name="oldLink" type="text" placeholder={`${window.location.host}/application/xxxxxxx`} onChange={onOldLinkChange} value={oldLink} />
              </InputGroup>
            </ValidatedComponent>
            <HelpBlock>Retrouve ce lien dans le mail de ta candidature de l'année passée</HelpBlock>
          </FormGroup>
          <button type="button" className="btn btn-success" disabled={!oldLink && !!error} onClick={onCopyApplicationClick}>Copier</button>
        </form>
      </Panel>
    </ButtonWrapperComponent>
  )
}

RenewForm.propTypes = {
  oldLink: PropTypes.string.isRequired,
  onOldLinkChange: PropTypes.func.isRequired,
  onCopyApplicationClick: PropTypes.func.isRequired,
  error: PropTypes.string
}

export default RenewForm
