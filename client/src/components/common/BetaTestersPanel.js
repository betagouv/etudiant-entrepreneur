import React, { Component, PropTypes } from 'react'
import {Panel} from 'react-bootstrap'

const BetaTestersPanel = () => {
  return (
    <Panel header="Cadre de l'expérimentation" bsStyle="info">
      <div>Ce service n'est actuellement disponible qu'aux candidats des PEPITE participant à l'expérimentation:</div>
      <ul>
        <li>PEPITE ETENA</li>
        <li>PEPITE 3EF</li>
        <li>PEPITE HESAM</li>
        <li>PEPITE PON</li>
        <li>PEPITE BRETAGNE</li>
        <li>PEPITE PICARDIE</li>
      </ul>
    </Panel>)
}

BetaTestersPanel.propTypes = {
}

export default BetaTestersPanel
