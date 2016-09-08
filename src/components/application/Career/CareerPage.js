import React, {PropTypes} from 'react'
import CareerForm from './CareerForm'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as careerActions from '../../../actions/careerActions'

class CareerPage extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      career: Object.assign({}, props.career),
      errors: { bac: {} },
    }
    this.updateCareerState = this.updateCareerState.bind(this)
    this.updateBacState = this.updateBacState.bind(this)
  }

  updateCareerState(event) {
    const field = event.target.name
    let career = this.state.career
    career[field] = event.target.value
    this.props.actions.updateCareer(career)
    return this.setState({ career })
  }

  updateBacState(event) {
    const field = event.target.name
    let career = this.state.career
    career.bac = Object.assign({} , career.bac, { [field]: event.target.value })
    this.props.actions.updateCareer(career)
    return this.setState({ career })
  }

  render() {
    return (
      <CareerForm
        career={this.state.career}
        onChange={this.updateCareerState}
        onBacChange={this.updateBacState}
        errors={this.state.errors}/>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    career: state.career
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(careerActions, dispatch)
  }
}

CareerPage.propTypes = {
  career: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(CareerPage)
