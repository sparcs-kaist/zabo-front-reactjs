import React, { PureComponent } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import { LoginPage } from "components/pages";

import AuthPageWrapper from "./AuthPage.styled";

class AuthPage extends PureComponent {
  render() {
    return (
      <AuthPageWrapper>
        <Switch>
          <Route path="/auth/login" component={LoginPage} />
          <Redirect to="/auth/login" />
        </Switch>
      </AuthPageWrapper>
    );
  }
}

AuthPage.propTypes = {};

AuthPage.defaultProps = {};

export default AuthPage;
