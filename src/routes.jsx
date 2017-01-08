import React from 'react';
import {Route} from 'react-router';

import App from 'containers/App';
import Login from 'containers/Login';

export default(
  <Route path="/" component={App}>
    <Route path="/login" component={Login}/> {/* <IndexRoute titleName='Dashboard' component={UserIsAuthenticated(Dashboard)}/> */}
  </Route>
);
