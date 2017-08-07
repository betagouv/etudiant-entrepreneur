import React, { PropTypes } from 'react'
import { Panel, Button, ButtonGroup } from 'react-bootstrap'

const SentForm = ({ editForm, pepite }) => {
  return (
    <form>
      <Panel bsStyle="success" header="Mail de confirmation reçu">
        <p>Ta candidature a bien été envoyée</p>
        <p>Tu peux encore modifier ta candidature ici ou ultérieurement en utilisant le lien reçu par mail.</p>
        <p>Pour toute question sur les prochaines étapes, contacte ton PEPITE à cette adresse: <a href={`mailto:${pepite.email}`}>{pepite.email}</a></p>
      </Panel>
      <ButtonGroup block>
        <Button className="pull-right" bsStyle="success" onClick={editForm}>Modifier ma candidature</Button>
      </ButtonGroup>
    </form>
  )
}

SentForm.propTypes = {
  editForm: PropTypes.func.isRequired,
  pepite: PropTypes.object
}

export default SentForm
