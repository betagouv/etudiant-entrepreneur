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

  componentDidMount() {
    this.loadNextCommittee(this.props.pepiteId)
  }

  componentWillReceiveProps(nextProps) {
    this.loadNextCommittee(nextProps.pepiteId)
  }

  loadNextCommittee(pepiteId) {
    if (this.isComponentDisplayed(pepiteId)) {
      this.props.actions.getNextCommittee(pepiteId).then((nextCommittee) => {
        this.setState({ nextCommittee })
      })
    }
  }

  displayMessage() {
    if (!this.state.nextCommittee) {
      return (
        <div>Ce PEPITE n'a pas prévu son prochain comité d'engagement de prévu.</div>
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
    if (this.isComponentDisplayed(this.props.pepiteId)) {
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
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(committeeActions, dispatch)
  }
}

NextCommittee.propTypes = {
  pepiteId: PropTypes.number.isRequired,
  actions: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(NextCommittee)
