import React, { PropTypes } from 'react'
import { FormGroup, ControlLabel, FormControl, Button, ButtonToolbar, Panel } from 'react-bootstrap'
import applicationStatuses from './applicationStatuses'

const ApplicationFilterForm = ({ onClearFilter, onFilter, filter, pepiteList, onChange }) => {
  return (
    <Panel bsStyle="info" header="Filtre">
      <form>
        <FormGroup>
          <ControlLabel>Nom</ControlLabel>
          <FormControl name="name" placeholder="Nom" onChange={onChange} value={filter.name} />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Email</ControlLabel>
          <FormControl name="email" placeholder="email" type="email" onChange={onChange} value={filter.email} />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Établissement</ControlLabel>
          <FormControl name="establishment" placeholder="Établissement" onChange={onChange} value={filter.establishment} />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Statut</ControlLabel>
          <FormControl name="status" componentClass="select" onChange={onChange} value={filter.status}>
            <option value={''}>Tous les statuts</option>
            {applicationStatuses.map((status) => { return (<option key={status.value} value={status.value}>{status.name}</option>) })}
          </FormControl>
        </FormGroup>
        <FormGroup>
          <ControlLabel>PEPITE</ControlLabel>
          <FormControl name="pepite" componentClass="select" onChange={onChange} value={filter.pepite}>
            <option value={0}>Toutes les PEPITE</option>
            {pepiteList.map((pepite) => { return (<option key={pepite._id} value={pepite._id}>PEPITE {pepite.name}</option>) })}
          </FormControl>
        </FormGroup>
        <ButtonToolbar>
          <Button bsStyle="primary" onClick={onFilter}>Filtrer</Button>
          <Button bsStyle="info" onClick={onClearFilter}>Annuler</Button>
        </ButtonToolbar>
      </form>
    </Panel>
  )
}

ApplicationFilterForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  filter: PropTypes.object.isRequired,
  pepiteList: PropTypes.array.isRequired,
  onClearFilter: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired
}

export default ApplicationFilterForm
