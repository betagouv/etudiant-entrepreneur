import React, { Component, PropTypes } from 'react'
import {Panel} from 'react-bootstrap'

const BetaTestersPanel = () => {
  return (
    <Panel header="Cadre de l'expérimentation" bsStyle="info">
      <div>Ce service n'est actuellement disponible qu'aux candidats des PEPITE participant à l'expérimentation:</div>
      <ul>
        <li>PEPITE ETENA</li>
        <li><i>PEPITE 3EF</i> - inscriptions closes</li>
        <li><i>PEPITE HESAM</i> - inscriptions closes</li>
        <li><i>PEPITE PON</i> - inscriptions closes</li>
        <li><i>PEPITE BRETAGNE</i> - inscriptions closes</li>
        <li>PEPITE PICARDIE</li>
      </ul>
    </Panel>)
}

BetaTestersPanel.propTypes = {
}

export default BetaTestersPanel
