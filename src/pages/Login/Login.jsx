import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {isNil} from 'ramda';
import {routerActions} from 'react-router-redux';
import styled from 'styled-components';

import {oauthLogin} from 'state/authentication';
import properties from 'properties';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const StravaButton = styled.img`
  flex: 1 1 auto;
  cursor: pointer
  min-width: 500px;
`;

class Login extends Component {
  componentWillMount() {
    const {authenticated, location, login, replace, redirect} = this.props;
    if (location.query && location.query.code) {
      login(location.query.state, location.query.code);
    } else if (authenticated) {
      replace(redirect);
    }
  }

  componentWillReceiveProps(nextProps) {
    const {authenticated, replace, redirect} = nextProps;
    const {authenticated: wasAuthenticated} = this.props;
    if (!wasAuthenticated && authenticated) {
      replace(redirect);
    }
  }

  render() {
    const onConnect = e => {
      e.preventDefault();
      window.location = `https://www.strava.com/oauth/authorize?client_id=${properties.stravaClientId}&response_type=code&state=hideMe&approvalPrompt=force&redirect_uri=${properties.redirectUri}`;
    };

    return (
      <Container>
        <StravaButton src="/assets/img/strava-connect-light.svg" onClick={onConnect} />
      </Container>
    );
  }
}
Login.propTypes = {
  location: PropTypes.object,
  login: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  replace: PropTypes.func.isRequired,
  redirect: PropTypes.string.isRequired,
};

const mapStateToProps = (state, props) => {
  return {
    authenticated: !isNil(state.authentication.user),
    redirect: props.location.query.redirect || '/peaks',
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (state, code) => dispatch(oauthLogin(state, code)),
    replace: redirect => dispatch(routerActions.replace(redirect)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
