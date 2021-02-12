import React from 'react';
import PropTypes from 'prop-types';

const Login = (props) => {
  const enabledProviders = ['Github', 'Twitter', 'Facebook', 'Google', 'Email'];

  const loginButtons = enabledProviders.map((providerName) => (
    <button
      key={providerName}
      className={providerName.toLowerCase()}
      onClick={() => props.authenticate(providerName)}
    >
      Log In With {providerName}
    </button>
  ));

  return (
    <>
      <nav className="login">
        <h2>Inventory Login</h2>
        <p>Log in with one of your accounts</p>
        {loginButtons}
      </nav>
    </>
  );
};

Login.propTypes = {
  authenticate: PropTypes.func.isRequired,
};

export default Login;
