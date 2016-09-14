import React, {PropTypes} from 'react'
import { Panel } from 'react-bootstrap'

class SendPage extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <form>
        <p>Envoi</p>
        <Panel header="Droit d’accès et de rectification">
          <div>Les informations recueillies font l’objet d’un traitement informatique destiné à améliorer la qualité et la pertinence des politiques publiques en faveur de l’entrepreneuriat. Les destinataires des données sont : chacune des PEPITE (sur le périmètre les concernant) et les Ministères en charge de l’enseignement supérieur, de la recherche et de l’industrie, et la Caisse des dépôts et consignations (sur l’ensemble du périmètre).
Conformément à la loi « informatique et libertés » du 6 janvier 1978 modifiée en 2004, je bénéficie d’un droit d’accès et de rectification aux informations qui me concernent, que je peux exercer en m’adressant au ministère de l’Éducation nationale, de l’Enseignement supérieur et de la Recherche, Direction générale de l’enseignement supérieur et de l’insertion professionnelle, département du lien formation-emploi (DGESIP A1-1), 1 rue Descartes, 75005 Paris (contact@etudiant-entrepreneur.beta.gouv.fr).</div>
        </Panel>
      </form>
    )
  }
}

export default SendPage
