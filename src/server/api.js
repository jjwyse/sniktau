import fetch from 'isomorphic-fetch';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import {isNil} from 'ramda';

import {createToken, upsert, loadFromToken} from './db/user';
import logger from './logger';
import allPeaks from './db/data/all';

const SEVEN_DAYS_IN_SECONDS = 60 * 60 * 24 * 7;
const CERT = fs.readFileSync('private.key');

/**
 * If user does not exist, create user, then create session and return mashup of them all
 * @param {object} stravaUser The strava user to create
 * @param {object} res The express response object
 * @return {object} The newly created user and session token
 */
const createUserAndSession = stravaUser => {
  return upsert(stravaUser).then(sniktauUser => {
    const jwtToken = jwt.sign({data: sniktauUser}, CERT, {expiresIn: SEVEN_DAYS_IN_SECONDS});
    const session = {sniktauUserId: sniktauUser.id, bearerToken: stravaUser.access_token, token: jwtToken};
    return createToken(session).then(createdSession => {
      return {id: createdSession.sniktau_user_id, token: createdSession.token, strava: {...stravaUser}};
    });
  });
};

/**
 * Handles authenticating with strava, by exchanging the OAuth code for an access token
 * @param {object} req The express request object
 * @param {object} res The express response object
 */
const authenticate = (req, res) => {
  const {code} = req.body;
  const clientSecret = process.env.SNIKTAU_STRAVA_CLIENT_SECRET;
  const clientId = process.env.SNIKTAU_STRAVA_CLIENT_ID;

  const config = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'User-Agent': 'sniktau',
    },
    body: JSON.stringify({code, client_secret: clientSecret, client_id: clientId}),
  };

  logger.log(`Making request to Strava with config: ${JSON.stringify(config)}`);
  return fetch('https://www.strava.com/oauth/token', config)
    .then(response => {
      return response.json().then(json => {
        if (!response.ok) {
          res.status(502);
          res.json(json);
          return null;
        }

        return createUserAndSession(json).then(user => res.json(user));
      });
    })
    .catch(e => {
      logger.error(e);
      if (e.name && e.name === 'FetchError') {
        res.status(502);
        return res.json({error: 'Failed to exchange OAuth code for access token', details: e.reason});
      }

      res.status(500);
      return res.json({error: 'Failed to exchange OAuth code for access token'});
    });
};

/**
 * Returns all peaks
 * @param {object} req The express request object
 * @param {object} res The express response object
 */
const peaks = (req, res) => {
  console.log(JSON.stringify(req.user));
  return res.json(allPeaks);
};

/**
 * Ensures that the given request has a valid Bearer token
 * @param {object} req The express request object
 * @param {object} res The express response object
 * @param {Function} next Next function
 */
const authMiddleware = (req, res, next) => {
  // check if the user is authenticated and, if so, attach user to the request
  const bearer = req.headers.authorization;
  if (isNil(bearer)) {
    res.status(401);
    return res.json({error: 'Invalid bearer token'});
  }

  const token = bearer.split(' ')[1];
  return loadFromToken(token)
    .then(user => {
      if (!isNil(user)) {
        req.user = user;
        return next();
      }
      res.status(401);
      return res.json({error: 'Invalid bearer token'});
    });
};

/**
 * Top level function that defines what functions will handle what API requests
 * @param {object} expressApp The express app to add any API definitions to
 */
const init = expressApp => {
  expressApp.use(bodyParser.json());
  expressApp.get('/api/peaks', authMiddleware, peaks);
  expressApp.post('/api/oauth', authenticate);
};

export default init;
