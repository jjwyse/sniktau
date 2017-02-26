import React from 'react';
import {IndexRoute, Route} from 'react-router';

import Login from 'pages/Login/Login';
import Peaks from 'pages/Peaks/Peaks';

import Layout from 'components/PageTemplates/Layout';
import NotFound from 'pages/NotFound';

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={Login} />
    <Route path="/login" component={Login} />
    <Route path="/peaks" component={Peaks} />
    <Route path="*" component={NotFound} />
  </Route>
);
