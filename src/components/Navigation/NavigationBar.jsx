import React, {PropTypes} from 'react';
import AppBar from 'material-ui/AppBar';
import styled from 'styled-components';
import {withRouter} from 'react-router';

import Settings from 'components/Navigation/Settings';
import {primary} from 'variables';

const Bar = styled(AppBar)`
  background-color: ${primary} !important;
`;

/**
 * This example is taking advantage of the composability of the `AppBar`
 * to render different components depending on the application state.
 */
const NavigationBar = ({router}) => {
  return (
    <Bar
      iconElementRight={<Settings />}
      onTitleTouchTap={() => router.push('/')}
      showMenuIconButton={false}
      title="Sniktau"
    />
  );
};
NavigationBar.propTypes = {
  router: PropTypes.object.isRequired,
};

export default withRouter(NavigationBar);
