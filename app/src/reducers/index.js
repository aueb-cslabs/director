import terminals from './terminals';
import users from './users';

import { reducer as formReducer } from 'redux-form'
import { connectRouter } from 'connected-react-router'
import { combineReducers } from 'redux';

export default (history) => combineReducers({
  terminals: terminals,
  users: users,
  form: formReducer,
  router: connectRouter(history),
});