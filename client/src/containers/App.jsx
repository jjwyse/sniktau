import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const App = ({children}) => {
  return (
    <div>
      <MuiThemeProvider>
        {children}
      </MuiThemeProvider>
    </div>
  );
};
App.propTypes = {
  children: React.PropTypes.any
};

export default App;
