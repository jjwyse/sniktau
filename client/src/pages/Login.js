import logo from "../logo.svg";

function Login() {
  return (
    <div className="App">
      <header className="App-header">
        <a className="login-link" href="https://www.strava.com/oauth/authorize?client_id=1529&redirect_uri=http://localhost:3000/oauth&response_type=code&approval_prompt=force&scope=activity:read" rel="noopener noreferrer">
          Login
          <img src={logo} className="App-logo" alt="logo" />
        </a>
      </header>
    </div>
  );
}

export default Login;