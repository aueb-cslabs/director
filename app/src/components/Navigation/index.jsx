import React from 'react'
import { Link, withRouter } from "react-router-dom"
import { connect } from 'react-redux'

import { logout } from '../../actions/users'

import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import sections from '../../libraries/sections'
import './Navigation.scss'

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  authenticated: state.users.authenticated,
})

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(function (props) {

  let privileged = props.authenticated ? <Nav>
    {
      sections.map(section =>
        <Nav.Item key={section.title}
          className={section.path === props.location.pathname ? "active" : ""} >
          <Link className="nav-link" to={section.path}>
            {section.element}
          </Link>
        </Nav.Item>
      )
    }
    <Nav.Item>
      <Link className="nav-link" to="/manage">
        {props.authenticated.full_name}
      </Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link onClick={props.logout}>
        <FontAwesomeIcon icon="sign-out-alt" />
      </Nav.Link>
    </Nav.Item>
  </Nav> : null;

  return <Navbar bg="primary" variant="dark" key="1">
    <div className="container">
      <Link className="navbar-brand" to="/">directr</Link>
      {privileged}
    </div>
  </Navbar>
}));
