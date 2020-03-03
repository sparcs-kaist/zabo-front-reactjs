import { useEffect } from 'react';

import axios from 'lib/axios';
import storage from 'lib/storage';

const LoginPage = ({ history }) => {
  useEffect (() => {
    const { state } = history.location;
    if (state && state.referrer) {
      storage.setItem ('referrer', state.referrer);
    }
    axios.get ('/auth/loginApi')
      .then (data => {
        window.location.replace (data.url);
      })
      .catch (error => {
        console.error (error);
        alert ('로그인에 실패하였습니다.');
      });
  }, [history]);
  return null;
};
LoginPage.propTypes = {};

LoginPage.defaultProps = {};

export default LoginPage;
