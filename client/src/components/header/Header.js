import React, { PropTypes } from 'react'
import { IndexLink } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../../actions/userActions'

export class Header extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    if (this.props.user.isAuthenticated) {
      return (
        <Navbar inverse className="navbar-fixed-top">
          <Navbar.Header>
            <Navbar.Brand>
              <IndexLink to="/pepite" className="navbar-brand">
                <span title="home" className="glyphicon glyphicon-home" />
              </IndexLink>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem id="navbar-user"><span title="home" className="glyphicon glyphicon-user" />  {this.props.user.username}</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar >
      )
    }
    return null
  }
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  }
}

Header.propTypes = {
  actions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
