import fetch from 'isomorphic-fetch';

/**
 * Handles authenticating with strava, by exchanging the OAuth code for an access token
 * @param {object} req The express request object
 * @param {object} res The express response object
 */
const authenticate = (req, res) => {
  const {code, client_id} = req.body;
  // TODO - JJW - properties file
  const clientSecret = '2157171cb27e65757f6928fc5d5ae0d2811088d1';

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
        res.send(json);
      }
      res.json(json);
    });
  });
};

/**
 * Top level function that handles any incoming requests to /api/...
 * @param {string} path The URL path
 * @param {object} req The express request object
 * @param {object} res The express response object
 */
const handle = (path, req, res) => {
  switch (path) {
    case '/api/oauth':
      return authenticate(req, res);
    default:
      res.status(404);
      return res.json({error: `No resource found at ${path}`});
  }
};

export default handle;
