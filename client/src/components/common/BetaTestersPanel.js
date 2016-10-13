import React, { Component, PropTypes } from 'react'
import {Panel} from 'react-bootstrap'

const BetaTestersPanel = () => {
  return (
    <Panel header="Cadre de l'expérimentation" bsStyle="info">
      <div>Ce service n'est actuellement disponible qu'aux candidats des PEPITE participant à l'expérimentation:</div>
      <ul>
        <li>PEPITE ETENA</li>
        <li>PEPITE PICARDIE</li>
        <li>PEPITE by PEEL</li>
        <li>PEPITE ECA</li>
        <li>PEPITE BeeLYS</li>
        <li>PEPITE PSL</li>
        <li>PEPITE Lille Nord de France</li>
        <li>PEPITE Vallée de Seine</li>
        <li>PEPITE CRÉER</li>
        <li><i>PEPITE 3EF</i> - inscriptions closes</li>
        <li><i>PEPITE HESAM</i> - inscriptions closes</li>
        <li><i>PEPITE PON</i> - inscriptions closes</li>
        <li><i>PEPITE BRETAGNE</i> - inscriptions closes</li>
      </ul>
    </Panel>)
}

BetaTestersPanel.propTypes = {
}

export default BetaTestersPanel
