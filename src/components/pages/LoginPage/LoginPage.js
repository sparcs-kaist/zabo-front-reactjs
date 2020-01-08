import React, { PureComponent } from 'react';

import LoginPageWrapper from './LoginPage.styled';

class LoginPage extends PureComponent {
  render () {
    return (
      <LoginPageWrapper>
        <a href="/api/auth/login">Login</a>
      </LoginPageWrapper>
    );
  }
}

LoginPage.propTypes = {};

LoginPage.defaultProps = {};

export default LoginPage;
