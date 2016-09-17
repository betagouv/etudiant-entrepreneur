import React, {PropTypes} from 'react'
import { Panel, Button } from 'react-bootstrap'

const SendForm = ({sendForm}) => {
  return (
    <form>
      <p>Envoi</p>
      <Button bsStyle="success" onClick={sendForm}>Envoyer ma candidature</Button>
    </form>
  )
}

SendForm.propTypes = {
  sendForm: PropTypes.func.isRequired
}

export default SendForm
