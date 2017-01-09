import React from 'react';
import ReactDom from 'react-dom';
import routes from 'routes';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore, combineReducers, compose} from 'redux';
import {Router, browserHistory} from 'react-router';
import {routerReducer, routerMiddleware, syncHistoryWithStore} from 'react-router-redux';
import * as reducers from 'reducers';
import thunk from 'redux-thunk';

const baseHistory = browserHistory;
const routingMiddleware = routerMiddleware(baseHistory);
const reducer = combineReducers(Object.assign({}, reducers, {routing: routerReducer}));
const enhancer = compose(applyMiddleware(thunk, routingMiddleware));

const store = createStore(reducer, enhancer);
const history = syncHistoryWithStore(baseHistory, store);

window.onload = () => {
  ReactDom.render(
    <Provider store={store}>
    <Router history={history} routes={routes} onUpdate={() => window.scrollTo(0, 0)}/>
  </Provider>, document.getElementById('app'));
};
