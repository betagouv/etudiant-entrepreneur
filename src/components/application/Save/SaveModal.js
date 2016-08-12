import React, {PropTypes} from 'react'
import { FormGroup, ControlLabel, FormControl, Button, Modal, HelpBlock } from 'react-bootstrap'
import ValidatedFormControl from '../../common/ValidatedFormControl'

const SaveModal = ({contact, saveForm, errors, onChange, isSaveShown, closeSave}) => {
  return (
    <Modal show={isSaveShown} onHide={closeSave}>
      <Modal.Header>
        <Modal.Title>Sauvegarder mon formulaire</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <FormGroup>
            <ControlLabel>Prénom</ControlLabel>
            <ValidatedFormControl name="firstname" type="text" placeholder="" onChange={onChange} value={contact.firstname} error={errors.firstname}/>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Nom</ControlLabel>
            <ValidatedFormControl name="name" type="text" placeholder="" onChange={onChange} value={contact.name} error={errors.name}/>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Email</ControlLabel>
            <ValidatedFormControl name="email" type="email" placeholder="" onChange={onChange} value={contact.email} error={errors.email}/>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Lien</ControlLabel>
            <ValidatedFormControl name="link" type="url" placeholder="Clique 'Sauver' pour obtenir le lien" onChange={onChange} value={contact.link} disabled={contact.link.length == 0}/>
            <HelpBlock>Lien vers ta cadidature</HelpBlock>
          </FormGroup>
          <Button bsStyle="primary" onClick={saveForm}>Sauver</Button>
        </form>
      </Modal.Body>
    </Modal>
  )
}

SaveModal.propTypes = {
  contact: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  saveForm: PropTypes.func.isRequired,
  isSaveShown: PropTypes.bool,
  closeSave: PropTypes.func.isRequired,
  errors: PropTypes.object
}

export default SaveModal
