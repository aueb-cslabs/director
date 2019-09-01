import React from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { closeModal, executeCommand, loadTerminalAsync } from '../../../actions/terminals';
import { actions, color, operatingIcon } from '../../../libraries/terminals';

import './Modal.scss';

const Modal = (props) => {
  if (!props.id) {
    return null;
  }

  let actualActions = actions([props])
    .filter(act => act.valid())
    .map(act =>
      <button key={act.command}
        className={`btn btn-${act.color}`} 
        onClick={() => props.command(props.name, act.command)}>
        <FontAwesomeIcon icon={act.icon} />
      </button>
    )

  return <div className="modal text-dark show" style={{ display: 'block' }}>
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">
            {props.name}
          </h5>
          <button type="button" className="close"
            onClick={props.close}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <table className="table table-sm table-borderless m-0">
            <tbody>
              <tr>
                <th scope="row">Status</th>
                <td style={{ color: color(props.status) }}>{props.status}</td>
              </tr>
              <tr>
                <th scope="row">Hostname</th>
                <td>{props.hostname}</td>
              </tr>
              <tr>
                <th scope="row">Address</th>
                <td>{props.addr}</td>
              </tr>
              <tr>
                <th scope="row">OS</th>
                <td>
                  {operatingIcon(props.operating_system)}
                  &nbsp;
                  {props.operating_system}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="modal-footer">
          <button
            className={`float-left btn btn-secondary`} 
            onClick={() => props.edit(props.name)}>
            <FontAwesomeIcon icon="pen" />
          </button>
          {actualActions}
        </div>
      </div>
    </div>
  </div>
}

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  ...state.terminals.all.find(terminal => terminal.id === state.terminals.modal),
})

const mapDispatchToProps = dispatch => {
  return {
    command: (terminal, command) => dispatch(executeCommand(terminal, command)),
    edit: (name) => dispatch(loadTerminalAsync(name)),
    close: () => dispatch(closeModal()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)