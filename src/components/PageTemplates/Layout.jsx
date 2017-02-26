import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import styled from 'styled-components';

// Needed for onTouchTap - http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const App = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Layout = ({children}) => {
  return (
    <App>
      <MuiThemeProvider>
        {children}
      </MuiThemeProvider>
    </App>
  );
};
Layout.propTypes = {
  children: React.PropTypes.any,
};

export default Layout;
