/**
 * http.js
 * Redux middleware for interacting with APIs
 * Inspired by:
 * https://github.com/reactjs/redux/blob/master/examples/real-world/src/middleware/api.js
 * https://github.com/agraboso/redux-api-middleware
 */
import fetch from 'isomorphic-fetch';
import {isNil, merge, pipe, reject} from 'ramda';
import {stringify} from 'querystring';
import {CALL_API, NOTIFICATIONS_ALERT, NOTIFICATIONS_MASK, NOTIFICATIONS_MASK_REMOVE} from 'state/types';
import {loadToken} from 'util/storage';

const createActionOfUnkownType = (actionType, options = {}) => {
  if (typeof actionType === 'object') {
    return pipe(merge(actionType), reject(isNil))(options);
  } else if (typeof actionType === 'function') {
    return actionType(options);
  }

  return {
    type: actionType,
    ...options,
  };
};

const httpMiddleware = store =>
  next =>
    action => {
      const httpCall = action[CALL_API];

      if (isNil(httpCall)) {
        return next(action);
      }

      // Merge the headers passed in on the action with the default
      // the object passed into this curried function and then remove
      // any null values
      const createHeaders = pipe(merge(httpCall.headers), reject(isNil));
      const headers = createHeaders({
        Authorization: `Bearer ${loadToken()}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'sniktau',
      });

      const method = httpCall.method || 'GET';
      const body = httpCall.payload ? JSON.stringify(httpCall.payload) : null;
      const qs = httpCall.query ? '?' + stringify(httpCall.query) : null;
      const endpoint = `/api${httpCall.endpoint}${qs || ''}`;

      if (httpCall.types.length === 1) {
        httpCall.types = [NOTIFICATIONS_MASK, httpCall.types[0], NOTIFICATIONS_ALERT];
      }

      const [requestType, successType, failureType] = httpCall.types;
      const isMaskRequest = requestType === NOTIFICATIONS_MASK;
      if (isMaskRequest) {
        store.dispatch({type: requestType, payload: {message: httpCall.message || 'Loading...'}});
      } else {
        store.dispatch(createActionOfUnkownType(requestType, {payload: httpCall.payload}));
      }

      const parseJSON = response => response.text().then(text => text ? JSON.parse(text) : {});

      return fetch(endpoint, {method: method, headers: headers, body: body})
        .then(response => {
          return parseJSON(response).then(data => {
            if (!response.ok) return Promise.reject(data);
            return data;
          });
        })
        .then(data => {
          if (!isNil(data.error)) Promise.reject(data.error);
          store.dispatch(createActionOfUnkownType(successType, {payload: data, metadata: httpCall.metadata}));

          if (isMaskRequest) {
            store.dispatch({type: NOTIFICATIONS_MASK_REMOVE, payload: null});
          }

          if (!isNil(httpCall.callback)) {
            return store.dispatch(httpCall.callback);
          }

          return Promise.resolve();
        })
        .catch(error => {
          if (isMaskRequest) {
            store.dispatch({type: NOTIFICATIONS_MASK, payload: null});
          }

          store.dispatch(createActionOfUnkownType(failureType, {payload: error, error: true}));

          // throw error in non-production environments to help debug
          if (process.env.NODE_ENV === 'production') {
            // eslint-disable-next-line no-console
            console.error(error);
          }
        });
    };

export default httpMiddleware;
