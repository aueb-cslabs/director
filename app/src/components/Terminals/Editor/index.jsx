import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import Nav from "react-bootstrap/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import * as Actions from "../../../actions/terminals";

import Form from "./form";
import Navigation from "../../Navigation/Small";

const Editor = ({ terminal, newTerminal, load, save, match }) => {
  if (!terminal) {
      if (match.params.name !== "new") {
        load(match.params.name);
      } else {
        newTerminal()
      }
  }

  return (
    <div>
      <Navigation>
        <Nav.Item>
          <Link className="nav-link" to="/">
            <FontAwesomeIcon icon="arrow-left" />
            &nbsp; Go back
          </Link>
        </Nav.Item>
      </Navigation>
      <div className="container pt-4">
        <Form initialValues={terminal} enableReinitialize
              onSubmit={save} />
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  terminal: state.terminals.loaded
});

const mapDispatchToProps = dispatch => {
  return {
    newTerminal: () => dispatch(Actions.newTerminal()),
    load: terminal => dispatch(Actions.loadTerminalAsync(terminal)),
    save: terminal => {} //dispatch(Actions.saveUserAsync(user))
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor));
