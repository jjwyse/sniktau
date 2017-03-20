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
 *
 * Invalidates the current user by removing authorization data from local storage
 */
const invalidate = () => localStorage.removeItem(KEY);

export {save, load, invalidate};
