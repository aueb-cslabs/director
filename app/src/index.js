import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux'
import { Provider } from 'react-redux';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fad } from '@fortawesome/pro-duotone-svg-icons';
import { fas } from '@fortawesome/pro-solid-svg-icons';

import './index.scss';

import App from './components/App';

library.add(fas, fad);

const store = createStore(() => {}, {})

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);
