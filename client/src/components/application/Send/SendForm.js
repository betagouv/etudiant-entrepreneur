import React, {PropTypes} from 'react'
import { Panel, Button } from 'react-bootstrap'

const SendForm = ({sendForm, isSending}) => {
  return (
    <form>
      <p>Envoi</p>
      <Button bsStyle="success" disabled={isSending} onClick={sendForm}>Envoyer ma candidature</Button>
    </form>
  )
}

SendForm.propTypes = {
  sendForm: PropTypes.func.isRequired,
  isSending: PropTypes.bool.isRequired
}

export default SendForm
