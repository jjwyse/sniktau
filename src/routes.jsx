import React from 'react';
import {Route} from 'react-router';

import Layout from 'components/Layout';
import Login from 'components/Login';
import NotFound from 'components/NotFound';

export default(
  <Route path="/" component={Layout}>
    <Route path="/login" component={Login}></Route>
    {/* <IndexRoute titleName='Dashboard' component={UserIsAuthenticated(Dashboard)}/> */}
    <Route path='*' component={NotFound}></Route>
  </Route>
);
