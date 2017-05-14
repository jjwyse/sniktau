import React, {PropTypes} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {connect} from 'react-redux';
import {isNil} from 'ramda';
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

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Layout = ({children, mask}) => {
  return (
    <App>
      <MuiThemeProvider>
        <Wrapper>
          {children}
          {!isNil(mask) && !isNil(mask.message) && <Mask key={mask.message} message={mask.message} />}
        </Wrapper>
      </MuiThemeProvider>
    </App>
  );
};
Layout.propTypes = {
  children: PropTypes.any,
  mask: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    mask: state.notifications.mask,
  };
};

export default connect(mapStateToProps)(Layout);
