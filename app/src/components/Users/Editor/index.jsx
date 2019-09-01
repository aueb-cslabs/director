import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import Nav from "react-bootstrap/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import * as Actions from "../../../actions/users";

import Form from "./form";
import Navigation from "../../Navigation/Small";

const Editor = ({ user, newUser, load, save, create, match }) => {
  if (!user) {
    if (match.params.username !== 'new') {
      load(match.params.username);
    } else {
      newUser()
    }
  }

  return (
    <div>
      <Navigation>
        <Nav.Item>
          <Link className="nav-link" to="/users">
            <FontAwesomeIcon icon="arrow-left" />
            &nbsp; Go back
          </Link>
        </Nav.Item>
      </Navigation>
      <div className="container pt-4">
        <Form
          initialValues={user} enableReinitialize
          onSubmit={user => (user.created_at ? save(user) : create(user))}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  user: state.users.loaded
});

const mapDispatchToProps = dispatch => {
  return {
    newUser: () => dispatch(Actions.newUser()),
    load: username => dispatch(Actions.loadUserAsync(username)),
    save: user => dispatch(Actions.saveUserAsync(user)),
    create: user => dispatch(Actions.createUserAsync(user))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Editor)
);
