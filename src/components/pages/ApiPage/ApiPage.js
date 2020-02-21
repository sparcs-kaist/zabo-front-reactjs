import React, { useEffect } from 'react';
import { Switch, useRouteMatch } from 'react-router-dom';

import { PublicRoute } from 'hoc/AuthRoutes';
import axios from 'lib/axios';

const Login = () => {
  useEffect (() => {
    axios.get ('/auth/loginApi')
      .then (data => {
        window.location.href = data.url;
      })
      .catch (error => {
        console.error (error);
        alert ('로그인에 실패하였습니다.');
      });
  }, []);
  return null;
};

const ApiPage = () => {
  const { path } = useRouteMatch ();
  return (
    <Switch>
      <PublicRoute path={`${path}/auth/login`} component={Login} />
    </Switch>
  );
};

ApiPage.propTypes = {};

ApiPage.defaultProps = {};

export default ApiPage;
