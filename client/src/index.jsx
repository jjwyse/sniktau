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

ReactDom.render(
  <Provider store={store}>
  <Router history={history} routes={routes}/>
</Provider>, document.getElementById('app'));
