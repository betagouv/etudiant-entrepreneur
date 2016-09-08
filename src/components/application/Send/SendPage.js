import React, {PropTypes} from 'react'

class SendPage extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <form>
        <p>Envoi</p>
        <div>Si tu es actuellement demandeur d'emploi, pense à intégrer le D2E dans <a target="_blank" href="https://www.service-public.fr/particuliers/vosdroits/F14926">ton projet personalisé de retour à l'emploi</a> avec ton conseiller Pôle emploi.</div>
      </form>
    )
  }
}

export default SendPage
