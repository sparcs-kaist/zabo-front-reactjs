/* eslint-disable */
import { PureComponent } from 'react';
import queryString from 'query-string';

class AuthCallback extends PureComponent {
  componentDidMount () {
    const { location, loginCallback, history } = this.props;
    const { code, state } = queryString.parse (location.search);
    if (code && state) {
      loginCallback (code, state)
        .then ((res) => {
          history.replace (`/${res.user.username}`);
        })
        .catch ((error) => {
          alert (error.message);
          history.replace ('/');
        });
    }
  }

  render () {
    return null;
  }
}

AuthCallback.propTypes = {};

AuthCallback.defaultProps = {};

export default AuthCallback;
