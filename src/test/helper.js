import jsdom from 'jsdom';

const mockery = require('mockery');
mockery.registerMock('properties', {
  googleMapsKey: '',
  stravaClientId: 0,
  stravaClientSecret: '',
  redirectUri: 'http://localhost:7447/login',
  dbConnectionString: `postgres://${process.env.SNIKTAU_DB_USER}@${process.env.SNIKTAU_DB_HOST}:${process.env.SNIKTAU_DB_PORT}/sniktau?connect_timeout=10&application_name=myapp`,
});
mockery.registerMock('server/db/pg', () => {
  return {
    insert: object => Promise.resolve(object),
  };
});
mockery.enable({warnOnReplace: false, warnOnUnregistered: false});

// Set up testing evnvironment to run like a browser in the command line
// global in node same as window.document
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;
global.navigator = global.window.navigator;

global.window.matchMedia = () => ({
  matches: false,
  addListener: () => {},
  removeListener: () => {},
});

global.Image = () => true;

const storageMock = () => {
  const storage = {};

  return {
    setItem: (key, value) => {
      storage[key] = value || '';
    },
    getItem: key => {
      return storage[key] || null;
    },
    removeItem: key => {
      delete storage[key];
    },
    get length() {
      return Object.keys(storage).length;
    },
    key: i => {
      const keys = Object.keys(storage);
      return keys[i] || null;
    },
  };
};
// mock the localStorage and sessionStorage
global.localStorage = storageMock();
global.sessionStorage = storageMock();
