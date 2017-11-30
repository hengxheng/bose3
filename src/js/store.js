import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { createLogger } from 'redux-logger';
import GiftReducer from './reducers/GiftReducer';

export default () => {
    let store = null;
    let middleware = null;

    var createLogger = require('redux-logger').createLogger;
    const logger = createLogger();

    middleware = applyMiddleware(logger);

    store = createStore(
        combineReducers({
            GiftReducer,
        }),
        {},
        compose(
            middleware,
            window.devToolsExtension ? window.devToolsExtension() : f => f // connect to redux devtools
        )
        
    );

    return store;
}