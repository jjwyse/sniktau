/**
 * app.jsx
 * App is the application's main entry point and is responsible
 * for applying the global redux store and rendering the application
 * in the DOM
 */

import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {syncHistoryWithStore} from 'react-router-redux';
import {browserHistory} from 'react-router';

import Root from 'root';
import ReactGA from 'react-ga';
import createStore from 'state';

// setup our google analytics configuration
ReactGA.initialize('UA-92631644-1');

const logPageView = () => {
  if (process.env.NODE_ENV) {
    ReactGA.set({page: window.location.pathname});
    ReactGA.pageview(window.location.pathname);
  }
};

const store = createStore();
const history = syncHistoryWithStore(browserHistory, store);

render(
  <AppContainer>
    <Root store={store} history={history} logPageView={logPageView} />
  </AppContainer>,
  document.getElementById('app'),
);

if (module.hot) {
  module.hot.accept('./root', () => {
    const NewRoot = require('./root').default;
    render(
      <AppContainer>
        <NewRoot store={store} history={history} logPageView={logPageView} />
      </AppContainer>,
      document.getElementById('app'),
    );
  });
}
