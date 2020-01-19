import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';
import { useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import SVG from 'atoms/SVG';
import Container from 'atoms/Container';
import logo from 'static/logo/logo.svg';
import { selectAuthenticated } from '../../../lib/utils';
import HeaderWrapper from './Header.styled';

const containerStyle = css`
  position: absolute;
  justify-content: space-between;
  align-items: center;
  >div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

const Header = ({ back, title, rightGroup }) => {
  const history = useHistory ();
  const [left, setLeft] = useState (0);
  useEffect (() => {
    const listener = () => setLeft (-window.pageXOffset);
    window.addEventListener ('optimizedScroll', listener);
    return () => window.removeEventListener ('optimizedScroll', listener);
  }, []);

  return (
    <HeaderWrapper>
      <Container ownStyle={containerStyle} style={{ left }}>
        <div>
          {back ? (
            <>
              <img alt="Go back" src={left} style={{ width: '15px', height: 'auto' }} onClick={history.goBack} />
              {title && <h1>{title}</h1>}
            </>
          ) : (
            <NavLink to="/">
              <img alt="logo" src={logo} style={{ width: '70px', height: '30px' }} />
            </NavLink>
          )}
        </div>
        {rightGroup}
      </Container>
    </HeaderWrapper>
  );
};

Header.propTypes = {
  back: PropTypes.bool,
  title: PropTypes.string,
  rightGroup: PropTypes.element,
};

Header.defaultProps = {
  back: false,
  title: '',
  rightGroup: null,
};

Header.AuthButton = () => {
  const isAuthenticated = useSelector (selectAuthenticated);
  const username = useSelector (state => state.getIn (['auth', 'info', 'username']));

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <NavLink to={`/${username}`} size="md" className="user-icon">
            <SVG icon="user" />
          </NavLink>
        </div>
      ) : (
        <NavLink to="/auth/login">Login</NavLink>
      )}
    </div>
  );
};

export default Header;
