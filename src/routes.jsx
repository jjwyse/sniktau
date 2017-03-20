import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {UserAuthWrapper} from 'redux-auth-wrapper';
import {routerActions} from 'react-router-redux';

import Login from 'pages/Login/Login';
import Peaks from 'pages/Peaks/Peaks';

import Layout from 'components/PageTemplates/Layout';
import LoggedInTemplate from 'components/PageTemplates/LoggedInTemplate';
import NotFound from 'pages/NotFound';

// Redirects to /login by default
const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.authentication.user,
  redirectAction: newLoc => dispatch => {
    dispatch(routerActions.replace(newLoc));
  },
});

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={Login} />
    <Route path="/login" component={Login} />

    // All routes below require authentication
    <Route component={UserIsAuthenticated(LoggedInTemplate)}>
      <Route path="/peaks" component={Peaks} />
    </Route>

    <Route path="*" component={NotFound} />
  </Route>
);
