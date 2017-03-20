import {saveUser} from 'util/storage';
import {CALL_API} from 'state/types';

const LOGGED_IN = 'AUTHENTICATION:LOGGED_IN';

const oauthLogin = (state, code) => ({
  [CALL_API]: {
    method: 'POST',
    endpoint: '/oauth',
    types: [LOGGED_IN],
    payload: {
      code,
      client_id: 1529,
    },
  },
});

const reducer = (state = {}, {type, payload}) => {
  switch (type) {
    case LOGGED_IN:
      saveUser(payload);
      return state;
    default:
      return state;
  }
};

export {reducer, oauthLogin};
