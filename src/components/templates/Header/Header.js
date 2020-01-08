import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import logo from 'static/logo/logo.svg';
import left from 'static/images/chevron_left.svg';

import SVG from 'atoms/SVG';
import HeaderWrapper from './Header.styled';

class Header extends PureComponent {
  goBack = () => {
    const { history } = this.props;
    history.goBack ();
  }

  render () {
    const { isAuthenticated, match, logout } = this.props;
    const { route } = match.params;

    return (
      <HeaderWrapper>
        <div className="container">
          {route ? (
            <img alt="Go back" src={left} style={{ width: '15px', height: 'auto' }} onClick={this.goBack} />
          ) : (
            <>
              <NavLink to="/">
                <img alt="logo" src={logo} style={{ width: '70px', height: '30px' }} />
              </NavLink>
              {isAuthenticated ? (
                <div>
                  <NavLink to="/my-page" size="md" className="user-icon">
                    <SVG icon="user" />
                  </NavLink>

                  <a href="#" onClick={logout}>
                    Logout
                  </a>
                </div>
              ) : (
                <NavLink to="/auth/login">Login</NavLink>
              )}
            </>
          )}
        </div>
      </HeaderWrapper>
    );
  }
}

Header.propTypes = {
  history: PropTypes.shape ({
    goBack: PropTypes.func,
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  match: PropTypes.shape ({
    params: PropTypes.shape ({
      route: PropTypes.string,
    }),
  }).isRequired,
  logout: PropTypes.func.isRequired,
};

Header.defaultProps = {};

export default Header;
