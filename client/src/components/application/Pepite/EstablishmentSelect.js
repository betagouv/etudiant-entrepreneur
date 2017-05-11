import React, { PropTypes } from 'react'
import { FormGroup, ControlLabel } from 'react-bootstrap'
import ValidatedFormControl from '../../common/ValidatedFormControl'
import pepiteApi from '../../../api/pepiteApi'

class EstablishmentSelect extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      establishments: []
    }
    this.onEstablishementSelect = this.onEstablishementSelect.bind(this)
    if (this.props.selectedRegion) {
      this.loadEstablishements(this.props.selectedRegion)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedRegion != nextProps.selectedRegion) {
      this.loadEstablishements(nextProps.selectedRegion)
    }
  }

  loadEstablishements(regionId) {
    pepiteApi.getEstablishments(regionId).then(establishments => {
      this.setState({ establishments })
    })
  }

  onEstablishementSelect(event) {
    const establishment = this.state.establishments.find((e) => (e._id == event.target.value))
    this.props.onEstablishementChange(establishment)
  }

  render() {
    if (this.props.isStudent && this.props.selectedRegion) {
      return (
        <FormGroup>
          <ControlLabel>Mon établissement pour l'année {this.props.schoolYear}</ControlLabel>
          <ValidatedFormControl name="establishment" componentClass="select" onChange={this.onEstablishementSelect} value={this.props.selectedEstablishment}>
            <option value={0} disabled>Sélectionner</option>
            {this.state.establishments.map((establishment) => {
              return (<option key={establishment._id} value={establishment._id}>{establishment.name}</option>)
            })}
          </ValidatedFormControl>
        </FormGroup>
      )
    } else {
      return null
    }
  }
}

EstablishmentSelect.propTypes = {
  selectedRegion: PropTypes.string.isRequired,
  selectedEstablishment: PropTypes.string.isRequired,
  isStudent: PropTypes.bool.isRequired,
  schoolYear: PropTypes.number.isRequired,
  onEstablishementChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
}

export default EstablishmentSelect
