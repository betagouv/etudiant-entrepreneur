import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Moment from 'moment'
import { Panel } from 'react-bootstrap'

import * as committeeActions from '../../../actions/committeeActions'

class NextCommittee extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  displayMessage() {
    if (!this.hasNextCommittee()) {
      return (
        <div>Ce PEPITE n'a pas prévu son prochain comité d'engagement.</div>
      )
    } else {
      return (
        <div>
          <p>Le prochain comité d'engagement de ce PEPITE aura lieu le {new Moment(this.props.nextCommittee.date).format('DD/MM/YYYY')}.</p>
          <p>La date limite de dépôt pour ce comité est le {new Moment(this.props.nextCommittee.lastApplicationDate).format('DD/MM/YYYY')}.</p>
          { this.props.nextCommittee.message ? <pre>{this.props.nextCommittee.message}</pre> : null }
        </div>
      )
    }
  }

  hasNextCommittee() {
    return (this.props.nextCommittee && this.props.nextCommittee._id)
  }

  render() {
    return (
      <Panel header="Prochain comité d'engagement" bsStyle={this.hasNextCommittee() ? 'info' : 'warning'}>
        {this.displayMessage()}
      </Panel>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    nextCommittee: state.nextCommittee
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

NextCommittee.propTypes = {
  nextCommittee: PropTypes.object,
}

export default connect(mapStateToProps, mapDispatchToProps)(NextCommittee)
