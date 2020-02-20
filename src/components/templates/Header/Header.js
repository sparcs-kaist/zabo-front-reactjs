import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { css } from 'styled-components';

import Container from 'atoms/Container';
import SVG from 'atoms/SVG';

import { isAuthedSelector } from 'lib/utils';

import logo from 'static/logo/logo.svg';

import SearchBar from '../SearchBar';
import { HeaderWrapper } from './Header.styled';

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
  back, title, rightGroup, scrollHeader, type,
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
              <img alt="logo" src={logo} style={{ width: '68px', height: '32px' }} />
            </NavLink>
          )}
        </div>
        <div
          style={{
            alignItems: 'flex-start', justifyContent: 'center', flex: '1', height: '50px', overflow: 'visible', marginTop: '12px',
          }}
        >
          <SearchBar isOpen />
        </div>
        {/* {rightGroup} */}
        <Header.AuthButton type={type} />
      </Container>
    </HeaderWrapper>
  );
};

Header.propTypes = {
  back: PropTypes.bool,
  title: PropTypes.string,
  rightGroup: PropTypes.element,
  type: PropTypes.string,
};

Header.defaultProps = {
  back: false,
  title: '',
  rightGroup: null,
  type: '',
};

Header.AuthButton = ({ type }) => {
  const isAuthenticated = useSelector (isAuthedSelector);
  const username = useSelector (state => state.getIn (['auth', 'info', 'username']));

  return (
    <HeaderWrapper.Auth>
      {isAuthenticated ? (
        <div>
          <NavLink to={`/${username}`} size="md" className="user-icon">
            <SVG icon="user" />
            <p>{username}</p>
          </NavLink>
          {type === 'upload' && (
            <Link to="/zabo/upload">
              <button type="button">업로드</button>
            </Link>
          )}
        </div>
      ) : (
        <div>
          <SVG icon="user" />
          <a className="upload" href="/api/auth/login">로그인</a>
        </div>
      )}
    </HeaderWrapper.Auth>
  );
};

export default Header;
