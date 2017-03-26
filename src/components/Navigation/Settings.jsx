import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {withRouter} from 'react-router';
import styled from 'styled-components';

import {logoutUser} from 'state/authentication';

const FlexContainer = styled.div`
  display: flex;
`;

const ProfilePic = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
`;

const Settings = ({logout, router, user}) => {
  const {athlete} = user.strava;
  return (
    <div>
      <FlexContainer>
        <ProfilePic src={`${athlete.profile_medium}`} />
        <IconMenu iconButtonElement={<IconButton value="arrow_r"><MoreVertIcon /></IconButton>}>
          <MenuItem primaryText="Profile" onClick={() => router.push('/profile')} />
          <MenuItem primaryText="Sign out" onClick={logout} />
        </IconMenu>
      </FlexContainer>
    </div>
  );
};

Settings.muiName = 'IconMenu';
Settings.propTypes = {
  router: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    user: state.authentication.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logoutUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Settings));
