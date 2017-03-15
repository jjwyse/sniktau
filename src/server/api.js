import fetch from 'isomorphic-fetch';
import {createSession, upsert} from 'db/user';
import allPeaks from '../data/all';

/**
 * If user does not exist, create user, then create session and return mashup of them all
 * @param {object} stravaUser The strava user to create
 * @param {object} res The express response object
 * @return {object} The newly created user and session token
 */
const createUserAndSession = (stravaUser) => {
  return upsert(stravaUser)
    .then(sniktauUser => {
      return createSession(sniktauUser)
        .then(token => ({token, ...stravaUser, ...sniktauUser}));
    });
};

/**
 * Handles authenticating with strava, by exchanging the OAuth code for an access token
 * @param {object} req The express request object
 * @param {object} res The express response object
 */
const authenticate = (req, res) => {
  const {code, client_id} = req.body;
  const clientSecret = process.env.STRAVA_CLIENT_SECRET;

  const config = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'User-Agent': 'sniktau',
    },
    body: JSON.stringify({code, client_secret: clientSecret, client_id}),
  };

  return fetch('https://www.strava.com/oauth/token', config).then(response => {
    return response.json().then(json => {
      if (!response.ok) {
        res.status(502);
        res.json(json);
        return null;
      }

      return createUserAndSession(json)
        .then(user => res.json(user));
    });
  });
};

/**
 * Returns all peaks
 * @param {object} req The express request object
 * @param {object} res The express response object
 */
const peaks = (req, res) => res.json(allPeaks);

/**
 * Top level function that defines what functions will handle what API requests
 * @param {object} expressApp The express app to add any API definitions to
 */
const init = expressApp => {
  expressApp.get('/api/peaks', peaks);
  expressApp.post('/api/oauth', authenticate);
};

export default init;
