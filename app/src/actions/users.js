import axios from "axios";
import { push } from "connected-react-router";

import environment from '../environment/environment';

export const LOAD_USER = "@directr/LOAD_USER";
export const LOAD_USER_ERROR = "@directr/LOAD_USER_ERROR";
export const LOGOUT = "@directr/LOGOUT_USER";

export function loadUser(user) {
  return { type: LOAD_USER, user: user };
}

export function loadUserAsync(username) {
  return dispatch => {
    axios
      .get(`${environment.api}/user/${username}`)
      .then(response => {
        dispatch(loadUser(response.data));
        dispatch(push("/users/" + response.data.username));
      })
      .catch(error => dispatch(loadUserError(error.response.data.message)));
  };
}

export function loadUserError(error) {
  return dispatch => {
    dispatch(push("/users"));
    dispatch({
      type: LOAD_USER_ERROR,
      error: error
    })
  };
}

export function newUser() {
  return dispatch => {
    dispatch(loadUser({ local: true }));
    dispatch(push("/users/new"));
  };
}

export function createUserAsync(user) {
  return dispatch => {
    axios
      .post(`${environment.api}/user`, user)
      .then(response => {
        dispatch(loadUser(response.data));
      })
      .catch(error => loadUserError(error.response.data.message));
  };
}

export function saveUserAsync(user) {
  return dispatch => {
    axios
      .put(`${environment.api}/user/${user.username}`, user)
      .then(response => dispatch(loadUser(response.data)));
  };
}


export function logout() {
  return { type: LOGOUT };
}
