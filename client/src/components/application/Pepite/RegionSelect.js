import React, { PropTypes } from 'react'
import { FormGroup, ControlLabel } from 'react-bootstrap'
import ValidatedFormControl from '../../common/ValidatedFormControl'
import pepiteApi from '../../../api/pepiteApi'

class RegionSelect extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      regions: []
    }
    this.loadRegions()
  }

  loadRegions() {
    pepiteApi.getRegions().then(regions => {
      this.setState({ regions })
    })
  }

  render() {
    return (
      <FormGroup className="required">
        <ControlLabel>Ma région</ControlLabel>
        <ValidatedFormControl name="region" componentClass="select" onChange={this.props.onChange} value={this.props.selectedRegion} error={this.props.errors.region}>
          <option value={0} disabled>Sélectionner</option>
          {this.state.regions.map((region, index) => { return (<option key={region._id} value={region._id}>{region.name}</option>) })}
        </ValidatedFormControl>
      </FormGroup>
    )
  }
}

RegionSelect.propTypes = {
  selectedRegion: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
}

export default RegionSelect
