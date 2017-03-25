const KEY = 'sniktau';

/**
 * Saves the given JSON into local storage
 * @param {object} json The json object to save to local storage
 */
const save = json => localStorage.setItem(KEY, JSON.stringify(json));

/**
 * Loads are given authorization data from local storage
 * @return {object} Load our authorization data from local storage
 */
const load = () => JSON.parse(localStorage.getItem(KEY));

/**
 * Loads the given authorization token from local storage
 * @return {string} The authenticated user's token, or null
 */
const loadToken = () => {
  const user = load() || {};
  return user.token;
};

/**
 *
 * Invalidates the current user by removing authorization data from local storage
 */
const invalidate = () => localStorage.removeItem(KEY);

export {save, load, loadToken, invalidate};
