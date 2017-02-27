import React, { PropTypes } from 'react'
import { FormGroup, ControlLabel } from 'react-bootstrap'
import ValidatedFormControl from '../../common/ValidatedFormControl'
import { getCurrentYear } from '../../common/yearHelper'
import pepiteApi from '../../../api/pepiteApi'

class PepiteSelect extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      pepites: []
    }
    if (this.props.selectedRegion) {
      this.loadPepites(this.props.selectedRegion, this.props.selectedPepite)
    }
  }

  componentWillReceiveProps(nextProps) {
    if ((this.props.selectedRegion != nextProps.selectedRegion) ||
      (this.props.selectedPepite != nextProps.selectedPepite)) {
      this.loadPepites(nextProps.selectedRegion, nextProps.selectedPepite)
    }
  }

  loadPepites(regionId, pepiteId) {
    if (pepiteId && pepiteId != '0') {
      pepiteApi.getPepite(pepiteId).then(pepite => {
        this.setState({ pepites: [pepite] })
      })
    } else {
      pepiteApi.getPepites(regionId).then(pepites => {
        this.setState({ pepites })
      })
    }
  }

  isComponentVisible() {
    return (this.props.selectedRegion)
  }

  render() {
    if (this.isComponentVisible()) {
      return (
        <FormGroup className="required">
          <ControlLabel>Mon PEPITE</ControlLabel>
          <ValidatedFormControl name="pepite" componentClass="select" onChange={this.props.onChange} value={this.props.selectedPepite} error={this.props.errors.pepite}>
            <option value={0} disabled>Sélectionner</option>
            {this.state.pepites.map((pepite) => { return (<option key={pepite._id} value={pepite._id}>PEPITE {pepite.name}</option>) })}
          </ValidatedFormControl>
        </FormGroup>
      )
    } else {
      return null
    }
  }
}

PepiteSelect.propTypes = {
  selectedRegion: PropTypes.string.isRequired,
  selectedPepite: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
}

export default PepiteSelect
