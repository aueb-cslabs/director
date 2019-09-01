import React, { useState } from "react";
import { connect } from "react-redux";
import { Route, withRouter, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";

import * as Actions from "../../actions/users";

import Navigation from "../Navigation/Small";
import Editor from "./Editor";

const Component = ({ newUser, load, error }) => {
  const [term, setTerm] = useState("");

  return (
    <div>
      <Navigation>
        <Nav.Item>
          <Nav.Link onClick={newUser}>
            <FontAwesomeIcon icon="plus" />
            &nbsp; Add new local user
          </Nav.Link>
        </Nav.Item>
      </Navigation>
      <div className="container pt-4">
        {error ? <Alert variant="danger">{error}</Alert> : null}
        <Form
          onSubmit={e => {
            e.preventDefault();
            load(term);
          }}
        >
          <InputGroup>
            <Form.Control
              placeholder="Enter username"
              value={term}
              onChange={e => setTerm(e.target.value)}
            />
            <InputGroup.Append>
              <Button type="submit" variant="success">
                Search
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  error: state.users.error
});

const mapDispatchToProps = dispatch => {
  return {
    newUser: () => dispatch(Actions.newUser()),
    load: username => dispatch(Actions.loadUserAsync(username))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Component)
);
