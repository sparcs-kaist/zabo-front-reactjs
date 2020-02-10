import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { css } from 'styled-components';

import Container from 'atoms/Container';
import SVG from 'atoms/SVG';

import { isAuthedSelector } from 'lib/utils';

import logo from 'static/logo/logo.svg';

import SearchBar from '../SearchBar';
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
  ${props => (props.scrollHeader ? css`
    @media (min-width: 640px) {
      min-width: 1072px;
    }
  ` : css`
  `)}
`;

const Header = ({
  back, title, rightGroup, scrollHeader,
}) => {
  const history = useHistory ();
  const [left, setLeft] = useState (0);
  useEffect (() => {
    const listener = () => setLeft (-window.pageXOffset);
    window.addEventListener ('optimizedScroll', listener);
    return () => window.removeEventListener ('optimizedScroll', listener);
  }, []);
  const style = { left };

  return (
    <HeaderWrapper>
      <Container ownStyle={containerStyle} style={style} scrollHeader={scrollHeader}>
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
        <div
          style={{
            alignItems: 'flex-start', flex: '1', height: '50px', overflow: 'visible', marginTop: '12px',
          }}
        >
          <SearchBar isOpen />
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
  const isAuthenticated = useSelector (isAuthedSelector);
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
        <a href="/api/auth/login">Login</a>
      )}
    </div>
  );
};

export default Header;
