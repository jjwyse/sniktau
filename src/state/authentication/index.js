import {invalidate, load, save} from 'util/storage';
import {CALL_API} from 'state/types';

/* Constants */
export const LOGGED_IN = 'AUTHENTICATION:LOGGED_IN';
export const LOGGED_OUT = 'AUTHENTICATION:LOGGED_OUT';

/* Actions */
const oauthLogin = (state, code) => ({
  [CALL_API]: {
    method: 'POST',
    endpoint: '/oauth',
    types: [LOGGED_IN],
    payload: {code},
    message: 'Authenticating with Strava...',
  },
});

const logoutUser = () => ({type: LOGGED_OUT, payload: {}});

/* Reducer */
const initialState = {user: load()};

const reducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case LOGGED_IN:
      save(payload);
      return Object.assign({}, state, {user: payload});
    case LOGGED_OUT:
      invalidate();
      return {user: null};
    default:
      return state;
  }
};

export {reducer, logoutUser, oauthLogin};
