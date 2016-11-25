import jsdom from 'jsdom';
import {expect} from 'chai';

const mockery = require('mockery');
mockery.registerMock('config', () => ({
  github: {
    clientId: 'foo'
  },
  google: {
    clientId: 'foo'
  },
  redirectUri: 'http://foobar.com',
  production: true,
  env: 'production',
  url: 'https://api.cloud-elements.com'
}));
mockery.enable({warnOnReplace: false, warnOnUnregistered: false});

// Set up testing evnvironment to run like a browser in the command line
// global in node same as window.document
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;
global.navigator = global.window.navigator;

global.window.matchMedia = () => ({
  matches: false,
  addListener: () => {},
  removeListener: () => {}
});

const storageMock = () => {
  const storage = {};

  return {
    setItem: (key, value) => {
      storage[key] = value || '';
    },
    getItem: (key) => {
      return storage[key] || null;
    },
    removeItem: (key) => {
      delete storage[key];
    },
    get length() {
      return Object.keys(storage).length;
    },
    key: (i) => {
      const keys = Object.keys(storage);
      return keys[i] || null;
    }
  };
};
// mock the localStorage and sessionStorage
global.localStorage = storageMock();
global.sessionStorage = storageMock();

export {expect};
