export const MASK = 'MASK';
export const MASK_HIDE = 'MASK_HIDE';
export const LOGGED_IN = 'LOGGED_IN';

const mask = msg => ({type: MASK, msg});

const unmask = () => ({type: MASK_HIDE});

const oauthLogin = (state, code) => {
  return dispatch => {
    dispatch(mask('Logging in...'));
    const config = {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'sniktau',
      },
      body: JSON.stringify({code, client_id: 1529}),
    };
    return fetch('/api/oauth', config)
      .then(r => r.json())
      .then(responseJson => console.log(`Received JSON response: ${JSON.stringify(responseJson)}`))
      .then(() => dispatch(unmask()))
      .catch(e => console.log(`Epic fail: ${e}`));
  };
};

const reducer = (state = {}) => {
  return state;
};

export {reducer, oauthLogin};
