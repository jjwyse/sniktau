import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {withRouter} from 'react-router';

import {logoutUser} from 'state/authentication';

const Settings = ({router, logout}) => {
  return (
    <IconMenu iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}>
      <MenuItem primaryText="Profile" onClick={() => router.push('/profile')} />
      <MenuItem primaryText="Sign out" onClick={logout} />
    </IconMenu>
  );
};

Settings.muiName = 'IconMenu';
Settings.propTypes = {
  router: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logoutUser()),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(Settings));
