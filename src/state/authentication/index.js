import {CALL_API} from 'state/types';

const LOGGED_IN = 'AUTHENTICATION:LOGGED_IN';

const oauthLogin = (state, code) => {
  return {
    [CALL_API]: {
      method: 'POST',
      endpoint: '/oauth',
      types: [LOGGED_IN],
      payload: {
        code,
        client_id: 1529,
      },
    },
  };
};

const reducer = (state = {}) => {
  return state;
};

export {reducer, oauthLogin};
