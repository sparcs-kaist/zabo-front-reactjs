import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import toJS from 'hoc/toJS';
import AuthCallback from './AuthCallback';

import { loginCallback } from '../../../store/reducers/auth';

class AuthCallbackContainer extends PureComponent {
  render () {
    return <AuthCallback {...this.props} />;
  }
}

const mapStateToProps = state => ({
  jwt: state.getIn (['auth', 'jwt']),
  info: state.getIn (['auth', 'info']),
});

const mapDispatchToProps = {
  loginCallback,
};

export default connect (mapStateToProps, mapDispatchToProps) (toJS (AuthCallbackContainer));
