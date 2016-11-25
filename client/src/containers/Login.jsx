import React, {Component, PropTypes} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux';
import {oauthLogin} from 'actions';

class Login extends Component {
  componentDidMount() {
    const {location, login} = this.props;
    if (location.query && location.query.code) {
      login(location.query.state, location.query.code);
    }
  }

  render() {
    const onConnect = (e) => {
      e.preventDefault();
      window.location = `https://www.strava.com/oauth/authorize?client_id=1529&response_type=code&state=hideMe&approvalPrompt=force&redirect_uri=http://localhost:7337/login`;
    };

    return (
      <div style={{
        background: 'url(/images/background.jpg)',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        minHeight: '600px',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat'
      }}>
        <RaisedButton type='button' label='Connect' style ={{
          cursor: 'pointer',
          padding: '0',
          margin: '25px',
          position: 'absolute',
          bottom: 0,
          right: 0
        }} onClick={onConnect}/>
      </div>
    );
  }
}
Login.propTypes = {
  location: PropTypes.object,
  login: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (state, code) => dispatch(oauthLogin(state, code))
  };
};

export default connect(null, mapDispatchToProps)(Login);
