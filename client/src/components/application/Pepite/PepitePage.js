import React, { PropTypes } from 'react'
import PepiteForm from './PepiteForm'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as pepiteActions from '../../../actions/pepiteActions'
import * as errorsActions from '../../../actions/errorsActions'
import Validation from '../../common/Validation'
import { pepiteValidationConstraints } from './PepiteValidationConstraints'

class PepitePage extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      pepite: Object.assign({}, props.pepite),
      contact: Object.assign({}, props.contact),
      errors: Object.assign({}, props.errors),
      regions: [],
      establishments: [],
      pepites: []
    }
    this.updatePepiteState = this.updatePepiteState.bind(this)
    this.updateEstablishment = this.updateEstablishment.bind(this)
    this.pepiteValidation = new Validation(pepiteValidationConstraints)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ errors: Object.assign({}, nextProps.errors) })
    this.setState({ contact: Object.assign({}, nextProps.contact) })
    this.setState({ pepite: Object.assign({}, nextProps.pepite) })
  }

  updatePepiteState(event) {
    const field = event.target.name
    const pepite = this.state.pepite
    pepite[field] = event.target.value
    if (field == 'region') {
      pepite.establishment = '0'
      pepite.pepite = '0'
    }
    this.validatePepiteField(field, event.target.value)
    this.props.actions.updatePepite(pepite)
    return this.setState({ pepite })
  }

  updateEstablishment(establishment) {
    const pepite = this.state.pepite
    pepite.establishment = establishment._id.toString()
    pepite.pepite = establishment.pepite.toString()
    this.validatePepiteField('pepite', pepite.pepite)
    this.props.actions.updatePepite(pepite)
    return this.setState({ pepite })
  }

  validatePepiteField(field, value) {
    const errors = Object.assign({}, this.state.errors)
    errors[field] = this.pepiteValidation.validateField(field, value)
    if (errors[field] == null) {
      delete errors[field]
    }
    this.props.errorsActions.updateComponentErrors('pepite', errors)
    return this.setState({ errors })
  }

  render() {
    return (
      <PepiteForm
        pepite={this.state.pepite}
        contact={this.state.contact}
        onChange={this.updatePepiteState}
        onEstablishmentChange={this.updateEstablishment}
        errors={this.state.errors}
        regions={this.state.regions}
        establishments={this.state.establishments}
        pepites={this.state.pepites}
      />
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    pepite: state.pepite,
    contact: state.contact,
    errors: state.errors.pepite
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(pepiteActions, dispatch),
    errorsActions: bindActionCreators(errorsActions, dispatch),
  }
}

PepitePage.propTypes = {
  pepite: PropTypes.object.isRequired,
  contact: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  errorsActions: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(PepitePage)
