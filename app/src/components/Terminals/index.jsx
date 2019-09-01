import React from "react";
import { connect } from "react-redux";

import { closeModal } from "../../actions/terminals";

import Modal from "./Modal";
import Provider from "./Provider";
import Terminal from "./Terminal";

import "./Terminals.scss";

class Terminals extends React.Component {
  render = () => {
    return (
      <div>
        <Modal />
        <Provider />
        <div className="terminals-scroller">
          <div className="terminals-wrapper">
            <div className="terminals">
              {this.props.terminals.map(terminal => (
                <Terminal key={terminal.name} {...terminal} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  terminals: state.terminals.all
});

const mapDispatchToProps = dispatch => {
  return {
    close: () => dispatch(closeModal())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Terminals);
