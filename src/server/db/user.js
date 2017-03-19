import {isNil} from 'ramda';

import pg from './pg';

const toStravaDbUser = stravaUser => ({
  id: stravaUser.athlete.id,
  email_address: stravaUser.athlete.email,
  first_name: stravaUser.athlete.firstname,
  last_name: stravaUser.athlete.lastname,
  city: stravaUser.athlete.city,
  state: stravaUser.athlete.state,
  country: stravaUser.athlete.country,
  sex: stravaUser.athlete.sex,
  photo: stravaUser.athlete.profile,
});

/**
 * Creates a new user
 * @param {object} stravaUser The strava user to create in sniktau
 * @return {object} The newly created user
 */
const create = (stravaUser) => {
  const newUser = toStravaDbUser(stravaUser);
  return pg('strava_user')
    .returning('id')
    .insert(newUser)
    .then(stravaId => {
      return pg('sniktau_user')
        .returning()
        .insert({strava_id: Number(stravaId)})
        .then(sniktauUser => sniktauUser);
    });
};

/**
 * Updates a strava user in the database
 * @param {object} stravaUser The strava user to update
 * @return {object} The updated user
 */
const update = stravaUser => {
  const updateUser = toStravaDbUser(stravaUser);
  return pg('strava_user')
    .returning()
    .where('id', '=', stravaUser.athlete.id)
    .update(updateUser)
    .then(() => {
      return pg('sniktau_user')
        .returning(['id', 'strava_id', 'last_login'])
        .where('strava_id', '=', stravaUser.athlete.id)
        .update({strava_id: stravaUser.athlete.id})
        .then(sniktauUsers => sniktauUsers[0]);
    });
};

/**
 * Upserts a strava user into the DB
 * @param {object} stravaUser The strava user
 * @return {object} The upserted user
 */
const upsert = stravaUser => {
  return pg('strava_user')
    .where({id: stravaUser.athlete.id})
    .select()
    .then(user => {
      return isNil(user) || user.length <= 0 ?
        create(stravaUser) :
        update(stravaUser);
    });
};

/**
 * Creates a new session for the given sniktau user ID
 * @param {Number} sniktauUserId The sniktau user ID
 * @param {string} bearerToken The strava OAuth bearer token
 * @return {string} The session token
 */
const createSession = ({sniktauUserId, bearerToken, token})=> {
  const newSession = { sniktau_user_id: sniktauUserId, token, strava_bearer_token: bearerToken };
  return pg('user_session')
    .returning(['sniktau_user_id', 'token'])
    .insert(newSession)
    .then(sessions => sessions[0]);
};


export {create, createSession, update, upsert};
