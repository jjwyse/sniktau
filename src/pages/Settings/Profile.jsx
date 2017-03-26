import React, {Component, PropTypes} from 'react';
import TextField from 'material-ui/TextField';
import {connect} from 'react-redux';

class Profile extends Component {
  render() {
    const {user} = this.props;
    const {athlete} = user.strava;
    return (
      <div>
        <h1>Sniktau User Profile</h1>
        <TextField disabled floatingLabelText={'First Name'} value={athlete.firstname} />
        <br />
        <TextField disabled floatingLabelText={'Last Name'} value={athlete.lastname} />
        <br />
        <TextField
          disabled
          floatingLabelText={'Home'}
          value={`${athlete.city}, ${athlete.state} - ${athlete.country}`}
        />
        <br />
      </div>
    );
  }
}
Profile.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    user: state.authentication.user,
  };
};

export default connect(mapStateToProps)(Profile);
