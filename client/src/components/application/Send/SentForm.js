import React, { PropTypes } from 'react'
import { Panel, Button, ButtonGroup } from 'react-bootstrap'

const SentForm = ({ editForm }) => {
  return (
    <form>
      <Panel bsStyle="success" header="Candidature envoyée">
        <p>Tu as reçu un mail de confirmation !</p>
        <p>Tu peux encore modifier ta candidature ici ou ultérieurement en utilisant le lien reçu par mail.</p>
        <p>Pour toute question sur les prochaines étapes, contacte ton PEPITE à l'adresse reçue par mail.</p>
      </Panel>
      <ButtonGroup block>
        <Button className="pull-right" bsStyle="success" onClick={editForm}>Modifier ma candidature</Button>
      </ButtonGroup>
    </form>
  )
}

SentForm.propTypes = {
  editForm: PropTypes.func.isRequired,
}

export default SentForm
