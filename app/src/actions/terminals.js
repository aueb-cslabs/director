import axios from "axios";
import { push } from "connected-react-router";

import environment from '../environment/environment';

export const LOAD_TERMINAL = "@directr/LOAD_TERMINAL";
export const LOAD_TERMINAL_ERROR = "@directr/LOAD_TERMINAL_ERROR";
export const UPDATE_TERMINALS = "@directr/UPDATE_TERMINALS";
export const UPDATE_TERMINALS_ASYNC = "@directr/UPDATE_TERMINALS_ASYNC";
export const OPEN_MODAL = "@directr/OPEN_MODAL_TERMINAL";
export const CLOSE_MODAL = "@directr/CLOSE_MODAL_TERMINAL";

export function loadTerminal(terminal) {
  return { type: LOAD_TERMINAL, terminal: terminal };
}

export function loadTerminalAsync(name) {
  return dispatch => {
    axios
      .get(`${environment.api}/terminal/${name}`)
      .then(response => {
        dispatch(loadTerminal(response.data));
        dispatch(push("/terminals/" + response.data.name));
      })
      .catch(error => dispatch(loadTerminalError(error.response.data.message)));
  };
}

export function newTerminal() {
  return dispatch => {
    dispatch(loadTerminal({}));
    dispatch(push("/terminals/new"));
  };
}

export function loadTerminalError(error) {
  return dispatch => {
    dispatch(push("/"));
    dispatch({
      type: LOAD_TERMINAL_ERROR,
      error: error
    })
  };
}

export function updateTerminals(terminals) {
  return { type: UPDATE_TERMINALS, terminals: terminals };
}

export function updateTerminalsAsync() {
  return dispatch => {
    axios
      .get(`${environment.api}/terminals`)
      .then(response => {
        dispatch(updateTerminals(response.data));
      })
      .catch(error => {});
  };
}

export function openModal(id) {
  return { type: OPEN_MODAL, id: id };
}

export function closeModal() {
  return { type: CLOSE_MODAL };
}

export function executeCommand(terminal, command, args = []) {
  return dispatch => {
    axios
      .post(`${environment.api}/terminal/${terminal}/execute`, {
        command: command,
        arguments: args
      })
      .then(response => {});
  };
}
