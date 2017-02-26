/**
 * Creates our redux store
 */

import thunkMiddleware from 'redux-thunk';
import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import {browserHistory} from 'react-router';
import {routerReducer as routing, routerMiddleware} from 'react-router-redux';

import {reducer as authentication} from 'state/authentication';

export const rootReducer = combineReducers({
  authentication,
  routing,
});

/**
 * Extends our root reducer to reset the state when log out actions are received
 * http://stackoverflow.com/a/35641992
 */
const reducer = (state, action) => {
  if (action.type === 'LOGOUT' || action.type === 'LOGIN_EXPIRED') {
    state = undefined;
  }
  return rootReducer(state, action);
};

const routingMiddleware = routerMiddleware(browserHistory);
const middleware = [thunkMiddleware, routingMiddleware];

const createReduxStore = (initialState = {}) => {
  const enhancers = [applyMiddleware(...middleware)];

  if (window.devToolsExtension) {
    enhancers.push(window.devToolsExtension());
  }

  return compose(...enhancers)(createStore)(reducer, initialState);
};

export default createReduxStore;
