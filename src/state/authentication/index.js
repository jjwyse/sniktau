import {load, save} from 'util/storage';
import {CALL_API} from 'state/types';

/* Constants */
export const LOGGED_IN = 'AUTHENTICATION:LOGGED_IN';

/* Actions */
const oauthLogin = (state, code) => ({
  [CALL_API]: {
    method: 'POST',
    endpoint: '/oauth',
    types: [LOGGED_IN],
    payload: {code},
  },
});

/* Reducer */
const initialState = {user: load()};

const reducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case LOGGED_IN:
      save(payload);
      return Object.assign({}, state, {authenticated: true, user: payload});
    default:
      return state;
  }
};

export {reducer, oauthLogin};
