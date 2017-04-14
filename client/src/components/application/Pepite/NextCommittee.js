import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Moment from 'moment'
import { Panel } from 'react-bootstrap'

import * as committeeActions from '../../../actions/committeeActions'

class NextCommittee extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      nextCommittee: undefined
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.isComponentDisplayed(nextProps.pepite.pepite) && this.props.pepite.pepite != nextProps.pepite.pepite) {
      this.props.actions.getNextCommittee(nextProps.pepite.pepite).then((nextCommittee) => {
        this.setState({ nextCommittee })
      })
    }
  }

  displayMessage() {
    if (!this.state.nextCommittee) {
      return (
        <div>Ce PEPITE n'a pas de comité d'engagement de prévu.</div>
      )
    } else {
      return (
        <div>Le prochain comité d'engagement de ce PEPITE aura lieu le {new Moment(this.state.nextCommittee.date).format('DD/MM/YYYY')}.</div>
      )
    }
  }

  isComponentDisplayed(pepiteId) {
    return (pepiteId && pepiteId != '0')
  }

  render() {
    if (this.isComponentDisplayed(this.props.pepite.pepite)) {
      return (
        <Panel header="Prochain comité d'engagement" bsStyle={this.state.nextCommittee ? 'info' : 'warning'}>
          {this.displayMessage()}
        </Panel>
      )
    }
    return null
  }
}

function mapStateToProps(state, ownProps) {
  return {
    pepite: state.pepite
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(committeeActions, dispatch)
  }
}

NextCommittee.propTypes = {
  pepite: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(NextCommittee)
