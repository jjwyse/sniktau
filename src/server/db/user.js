import pg from 'server/db/pg';

/**
 * Creates a new user
 * @param {object} stravaUser The strava user to create in sniktau
 * @return {object} The newly created user
 */
const create = (stravaUser) => {
  return pg('strava_user')
    .returning('id')
    .insert(stravaUser)
    .then(result => {
      return pg('sniktau-user')
        .insert({id: result.id, email_address: stravaUser.email_address})
        .then(sniktauUser => sniktauUser);
    });
};

const update = stravaUser => {
  // TODO - JJW
  return pg('strava_user')
    .update(stravaUser);
};

const upsert = stravaUser => {
  // TODO - JJW
  return pg('strava_user')
    .retrieve(stravaUser.id);
};

const createSession = sniktauUser => {
  // TODO - JJW
  return pg('user_session')
    .insert(sniktauUser);
};


export {create, createSession, update, upsert};
