import React, { PropTypes } from 'react'
import { Panel, Button, ButtonGroup } from 'react-bootstrap'

const SendForm = ({ sendForm, isSending }) => {
  return (
    <form>
      <ButtonGroup block>
        <Button className="pull-right" bsStyle="success" disabled={isSending} onClick={sendForm}>Envoyer ma candidature</Button>
      </ButtonGroup>
    </form>
  )
}

SendForm.propTypes = {
  sendForm: PropTypes.func.isRequired,
  isSending: PropTypes.bool.isRequired
}

export default SendForm
