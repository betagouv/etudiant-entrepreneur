import React, { PropTypes } from 'react'
import { FormGroup, ControlLabel, FormControl, Button, Panel } from 'react-bootstrap'

const PepiteApplicantFilterForm = ({ clearFilter, name, email, establishment, onChange }) => {
  const panelHeader = (<h1 className="filter-panel-header">Filtrer</h1>)

  return (
    <Panel collapsible className="filter-panel" bsStyle="info" header={panelHeader}>
      <form>
        <FormGroup>
          <ControlLabel>Nom</ControlLabel>
          <FormControl name="name" placeholder="Nom" onChange={onChange} value={name} />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Email</ControlLabel>
          <FormControl name="email" placeholder="email" type="email" onChange={onChange} value={email} />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Établissement</ControlLabel>
          <FormControl name="establishment" placeholder="Établissement" onChange={onChange} value={establishment} />
        </FormGroup>
        <Button bsStyle="info" className="reset" onClick={clearFilter}>Annuler</Button>
      </form>
    </Panel>
  )
}

PepiteApplicantFilterForm.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  establishment: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired,
}

export default PepiteApplicantFilterForm
