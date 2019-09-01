import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';

import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router'
import { ConnectedRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

import createRootReducer from './reducers';

import Navigation from './components/Navigation';

import Terminals from './components/Terminals';
import TerminalsEditor from './components/Terminals/Editor';

import Users from './components/Users';
import UsersEditor from './components/Users/Editor';

import './index.scss';

export const history = createBrowserHistory()

library.add(fas, fab);

const initialState = {
  terminals: {
    all: [],
    search: '',
    modal: undefined,
  },
  users: {
    authenticated: {
      username: 'p3150133',
      full_name: 'Spyridon Pagkalos',
      type: 1,
    },
    searchTerm: '',
    searchResults: []
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  createRootReducer(history),
  initialState,
  composeEnhancers(
    applyMiddleware(thunk, routerMiddleware(history))
  )
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Navigation />
      <Route exact path="/" component={Terminals} />
      <Route exact path="/terminals/:name" component={TerminalsEditor} />

      <Route exact path="/users" component={Users} />
      <Route exact path="/users/:username" component={UsersEditor} />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
