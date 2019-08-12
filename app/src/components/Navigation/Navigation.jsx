import React from 'react';
import { Route, Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';

import Terminals from './Terminals';

import sections from '../../libraries/sections';
import './Navigation.scss';

class Navigation extends React.Component {
  render() {

    return [
      <Navbar bg="danger" expand="lg">
        <div className="container">
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        </div>
      </Navbar>,
      <Navbar bg="transparent" className="py-3">
        <Nav>
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              {
                sections.
                  find(sec => sec.path == this.props.location.pathname).
                  element
              }
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {
                sections.map(section =>
                  <Link className="dropdown-item" to={section.path}>
                    {section.element}
                  </Link>
                )
              }
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
        <Route exact path="/" component={Terminals}></Route>
      </Navbar>
    ];
  }
}


export default withRouter(connect()(Navigation));
