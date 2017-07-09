import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { OverlayTrigger, Popover } from 'react-bootstrap'
import * as applicationActions from '../../../actions/applicationActions'
import OtherApplicationTable from './OtherApplicationTable'

class OtherApplicationLabel extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      otherApplications: []
    }

    this.props.actions.getOtherApplication(props.applicantId).then(otherApplications => {
      this.setState({
        otherApplications
      })
    })
  }

  render() {
    const otherAppPopover = <Popover id="tooltip"><OtherApplicationTable applications={this.state.otherApplications} /></Popover>

    return (
      <div>
        <OverlayTrigger placement="bottom" overlay={otherAppPopover}>
          <span className="badge">{this.state.otherApplications.length}</span>
        </OverlayTrigger>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(applicationActions, dispatch),
  }
}

OtherApplicationLabel.propTypes = {
  actions: PropTypes.object.isRequired,
  applicantId: PropTypes.string.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(OtherApplicationLabel)
