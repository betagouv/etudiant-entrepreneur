import React, {PropTypes} from 'react'
import PepiteForm from './PepiteForm'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as pepiteActions from '../../../actions/pepiteActions'

class PepitePage extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      pepite: Object.assign({}, props.pepite),
      contact: Object.assign({}, props.contact),
      errors: {},
    }
    this.updatePepiteState = this.updatePepiteState.bind(this)
  }

  updatePepiteState(event) {
    const field = event.target.name
    let pepite = this.state.pepite
    pepite[field] = event.target.value
    if (field == 'region') {
      pepite.establishment = 0
    }
    this.props.actions.updatePepite(pepite)
    return this.setState({ pepite })
  }
  render() {
    return (
      <PepiteForm
        pepite={this.state.pepite}
        contact={this.state.contact}
        onChange={this.updatePepiteState}
        errors={this.state.errors}/>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    pepite: state.pepite,
    contact: state.contact,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(pepiteActions, dispatch)
  }
}

PepitePage.propTypes = {
  pepite: PropTypes.object.isRequired,
  contact: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(PepitePage)
