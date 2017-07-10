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
    const otherAppPopover = <Popover id="tooltip"><OtherApplicationTable pepites={this.props.pepites} applications={this.state.otherApplications} /></Popover>

    if (this.state.otherApplications.length) {
      return (
        <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={otherAppPopover}>
          <button>
            {this.state.otherApplications.length}
          </button>
        </OverlayTrigger>
      )
    } else {
      return (
          <button disabled>-</button>
      )
    }
  }
}

function mapStateToProps(state, ownProps) {
  return {
    pepites: state.pepiteList
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(applicationActions, dispatch),
  }
}

OtherApplicationLabel.propTypes = {
  actions: PropTypes.object.isRequired,
  applicantId: PropTypes.string.isRequired,
  pepites: PropTypes.array.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(OtherApplicationLabel)
