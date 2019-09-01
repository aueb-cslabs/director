import * as Actions from '../actions/users';

export default (state, action) => {
  switch (action.type) {

    case Actions.LOAD_USER: {
      return {
        ...state,
        loaded: action.user,
        error: null,
      }
    }

    case Actions.LOAD_USER_ERROR: {
      return {
        ...state,
        error: action.error,
      }
    }

    case Actions.LOGOUT: {
      return {
        ...state,
        authenticated: null,
      }
    }

    default: return {...state}
  }
}