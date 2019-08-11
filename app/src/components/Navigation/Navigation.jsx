import React from 'react';
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';

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
      <Navbar bg="transparent" className="pt-4">
        <div className="container">
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
        </div>
      </Navbar>
    ];
  }
}

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
});

export default withRouter(connect()(Navigation));
