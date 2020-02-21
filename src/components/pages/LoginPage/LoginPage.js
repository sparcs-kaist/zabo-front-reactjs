import React, { PureComponent } from 'react';

import LoginPageWrapper from './LoginPage.styled';

class LoginPage extends PureComponent {
  render () {
    return (
      <LoginPageWrapper>
        <h1>로그인이 필요한 기능입니다.</h1>
        <a href="/api/auth/login">로그인</a>
      </LoginPageWrapper>
    );
  }
}

LoginPage.propTypes = {};

LoginPage.defaultProps = {};

export default LoginPage;
