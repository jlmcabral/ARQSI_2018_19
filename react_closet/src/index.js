import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';

import buildStore from './shared/state/buildStore';

import './index.css';

ReactDOM.render(
    <Provider store={ buildStore() }>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root'),
);
