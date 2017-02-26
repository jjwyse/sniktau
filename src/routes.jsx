import React from 'react';
import {IndexRoute, Route} from 'react-router';

import Layout from 'components/PageTemplates/Layout';
import Login from 'pages/Login/Login';
import NotFound from 'pages/NotFound';

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={Login} />
    <Route path="/login" component={Login} />
    <Route path="*" component={NotFound} />
  </Route>
);
