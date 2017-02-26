import React, {PropTypes} from 'react';
import {Router} from 'react-router';
import {Provider} from 'react-redux';
import routes from 'routes';

const Root = ({store, history, logPageView}) => (
  <Provider store={store}>
    <Router history={history} routes={routes} onUpdate={logPageView} />
  </Provider>
);

Root.propTypes = {
  store: PropTypes.any,
  history: PropTypes.any,
  logPageView: PropTypes.func,
};

export default Root;
