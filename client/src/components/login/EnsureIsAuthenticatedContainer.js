import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { browserHistory } from 'react-router'

export class EnsureIsAuthenticatedContainer extends React.Component {
  componentDidMount() {
    const { currentURL, isUserAuthenticated } = this.props

    if (!isUserAuthenticated) {
      browserHistory.replace("/login")
    }
  }

  render() {
    if (this.props.isUserAuthenticated) {
      return this.props.children
    } else {
      return null
    }
  }
}

function mapStateToProps(state, ownProps) {
  return {
    isUserAuthenticated: state.user.isAuthenticated,
    currentURL: ownProps.location.pathname,
  }
}

EnsureIsAuthenticatedContainer.propTypes = {
  isUserAuthenticated: PropTypes.bool.isRequired,
  currentURL: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(EnsureIsAuthenticatedContainer)
