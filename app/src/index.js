import React from 'react';
import ReactDOM from 'react-dom';

import {createStore} from 'redux';
import {Provider} from 'react-redux';

import {library} from '@fortawesome/fontawesome-svg-core';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {fas} from '@fortawesome/free-solid-svg-icons';

import './index.scss';

import reducers from './reducers';
import App from './components/App/App';

library.add(fas, fab);

const store = createStore(
    reducers,
    {
      terminals: [
        {
          id: 1,
          name: 'CSLAB2-11',
          status: 'ONLINE',
          pos_y: 0,
          pos_x: 0,
          operating_system: 'windows',
        },
        {
          id: 2,
          name: 'CSLAB2-12',
          status: 'LOCKED',
          pos_y: 1,
          pos_x: 0,
          operating_system: 'linux',
        },
        {
          id: 3,
          name: 'CSLAB2-13',
          status: 'OFFLINE',
          pos_y: 0,
          pos_x: 1,
          operating_system: 'darwin',
        },
      ],
      y_u_debug_me_son: true,
    },
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
);
