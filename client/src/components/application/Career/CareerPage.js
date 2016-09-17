import React, {PropTypes} from 'react'
import CareerForm from './CareerForm'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as careerActions from '../../../actions/careerActions'
import * as errorsActions from '../../../actions/errorsActions'
import Validation from '../../common/Validation'
import {bacValidationConstraints, diplomaValidationConstraints} from './CareerValidationConstraints'

class CareerPage extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      career: Object.assign({}, props.career),
      contact: Object.assign({}, props.contact),
      errors: {tutor: {}}
    }
    this.updateTutorState = this.updateTutorState.bind(this)
    this.updateBacState = this.updateBacState.bind(this)
    this.updateDiplomaState = this.updateDiplomaState.bind(this)
    this.updateEntrepreneurship = this.updateEntrepreneurship.bind(this)

    this.bacValidation = new Validation(bacValidationConstraints)
    this.diplomaValidation = new Validation(diplomaValidationConstraints)
  }

  updateCareerState(event) {
    const field = event.target.name
    let career = this.state.career
    career[field] = event.target.value
    this.props.actions.updateCareer(career)
    return this.setState({ career })
  }

  updateTutorState(event) {
    const field = event.target.name
    let career = this.state.career
    career.tutor = Object.assign({}, career.tutor, { [field]: event.target.value })
    this.props.actions.updateCareer(career)
    return this.setState({ career })
  }

  updateBacState(event) {
    const field = event.target.name
    let career = this.state.career
    career.bac = Object.assign({}, career.bac, { [field]: event.target.value })
    this.props.actions.updateCareer(career)
    this.validateBacField(field, event.target.value)
    return this.setState({ career })
  }

  validateBacField(field, value) {
    const errors = Object.assign({}, this.props.bacErrors)
    errors[field] = this.bacValidation.validateField(field, value)
    if (errors[field] == null) {
      delete errors[field]
    }
    this.props.errorsActions.updateComponentErrors('bac', errors)
  }

  updateDiplomaState(event) {
    const field = event.target.name
    let career = this.state.career
    career.diploma = Object.assign({}, career.diploma, { [field]: event.target.value })
    this.props.actions.updateCareer(career)
    this.validateDiplomaField(field, event.target.value)
    return this.setState({ career })
  }

  validateDiplomaField(field, value) {
    const errors = Object.assign({}, this.props.diplomaErrors)
    errors[field] = this.diplomaValidation.validateField(field, value)
    if (errors[field] == null) {
      delete errors[field]
    }
    this.props.errorsActions.updateComponentErrors('diploma', errors)
  }

  updateEntrepreneurship(entrepreneurship) {
    let career = this.state.career
    career.entrepreneurship = [...entrepreneurship]
    this.props.actions.updateCareer(career)
    return this.setState({ career })
  }

  render() {
    return (
      <CareerForm
        career={this.state.career}
        contact={this.state.contact}
        onTutorChange={this.updateTutorState}
        onDiplomaChange={this.updateDiplomaState}
        onBacChange={this.updateBacState}
        onEntrepreneurshipChange={this.updateEntrepreneurship}
        errors={this.state.errors}
        bacErrors={this.props.bacErrors}
        diplomaErrors={this.props.diplomaErrors}/>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    career: state.career,
    contact: state.contact,
    bacErrors: state.errors.bac,
    diplomaErrors: state.errors.diploma
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(careerActions, dispatch),
    errorsActions: bindActionCreators(errorsActions, dispatch),
  }
}

CareerPage.propTypes = {
  career: PropTypes.object.isRequired,
  contact: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  errorsActions: PropTypes.object.isRequired,
  diplomaErrors: PropTypes.object.isRequired,
  bacErrors: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(CareerPage)
