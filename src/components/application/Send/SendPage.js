import React, {PropTypes} from 'react'

class SendPage extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <form>
        <p>Envoi</p>
        <div>Ici, je valide bientôt ma candidature avant envoi</div>
      </form>
    )
  }
}

export default SendPage
