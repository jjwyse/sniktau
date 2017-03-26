import React, {PropTypes} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {connect} from 'react-redux';
import styled from 'styled-components';

import Mask from 'components/Mask/Mask';

// Needed for onTouchTap - http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const App = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: hidden;
`;

const Layout = ({children, masks}) => {
  return (
    <App>
      <MuiThemeProvider>
        {children}
      </MuiThemeProvider>
      {masks.map(mask => <Mask key={mask.message} message={mask.message} />)}
    </App>
  );
};
Layout.propTypes = {
  children: PropTypes.any,
  masks: PropTypes.array.isRequired,
};

const mapStateToProps = state => {
  return {
    masks: state.notifications.masks,
  };
};

export default connect(mapStateToProps)(Layout);
