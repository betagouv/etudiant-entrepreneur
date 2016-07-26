import React, {PropTypes} from 'react'
import { IndexLink } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavItem } from 'react-bootstrap'

const Header = () => {
  return (
    <Navbar inverse className="navbar-fixed-top">
      <Navbar.Header>
        <Navbar.Brand>
          <IndexLink to="/"  className="navbar-brand">
            <span title="home" className="glyphicon glyphicon-home"/>
          </IndexLink>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <LinkContainer to="/application">
            <NavItem eventKey={1}>Candidature</NavItem>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar >
  )
}

export default Header
