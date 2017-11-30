import '../sass/style.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/app';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { routes } from './routes';
import { Provider } from 'react-redux';
import configureStore from './store';

const store = configureStore();

ReactDOM.render((
    <Provider store={ store }>
        <BrowserRouter>
            { renderRoutes(routes) }
        </BrowserRouter>
    </Provider>
), document.getElementById('root')); 