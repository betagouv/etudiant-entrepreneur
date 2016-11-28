import React, { PropTypes } from 'react'
import toastr from 'toastr'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as pepiteActions from '../../actions/pepiteActions'

export class PepiteHomePage extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
    }
  }

  render() {
    return (
      <div className="container">
        <div className="page-header">
          <h1>Vos candidats</h1>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(pepiteActions, dispatch),
  }
}

PepiteHomePage.propTypes = {
  actions: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(PepiteHomePage)
