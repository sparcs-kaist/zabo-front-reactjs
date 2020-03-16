import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { css } from 'styled-components';
import get from 'lodash.get';

import Container from 'atoms/Container';
import SVG from 'atoms/SVG';

import { setCurrentGroup } from 'store/reducers/auth';
import { isAuthedSelector } from 'lib/utils';

import whiteLogo from 'static/logo/logo_white.svg';
import logo from 'static/logo/logo.svg';

import SearchBar from '../SearchBar';
import { HeaderWrapper } from './Header.styled';

const logos = {
  primary: logo,
  white: whiteLogo,
};

const containerStyle = css`
  position: absolute;
  justify-content: space-between;
  align-items: center;
  overflow: visible;
  >div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  ${props => (props.horizontalScroll ? css`
    @media (min-width: 640px) {
      min-width: 1072px;
    }
  ` : css`
  `)}
`;

const Header = ({
  scrollHeader,
  transparent,
  logoColor,
  type,
  groupName,
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
    <HeaderWrapper transparent={transparent}>
      <Container ownStyle={containerStyle} style={style} horizontalScroll={scrollHeader}>
        <div>
          <NavLink to="/">
            <img alt="logo" src={logos[logoColor]} style={{ width: '68px', height: '32px' }} />
          </NavLink>
        </div>
        <div
          style={{
            alignItems: 'flex-start', justifyContent: 'center', flex: '1', height: '50px', overflow: 'visible', marginTop: '12px',
          }}
        >
          <SearchBar isOpen type={type} transparent={transparent} iconColor={logoColor} />
        </div>
        <Header.AuthButton type={type} groupName={groupName} transparent={transparent} />
      </Container>
    </HeaderWrapper>
  );
};

Header.propTypes = {
  type: PropTypes.string,
  groupName: PropTypes.string,
  transparent: PropTypes.bool,
  scrollHeader: PropTypes.bool,
  logoColor: PropTypes.oneOf (['white', 'primary']),
};

Header.defaultProps = {
  type: '',
  groupName: '',
  transparent: false,
  scrollHeader: false,
  logoColor: 'primary',
};

Header.AuthButton = ({ type, groupName, transparent }) => {
  const dispatch = useDispatch ();
  const isAuthenticated = useSelector (isAuthedSelector);
  const username = useSelector (state => get (state, ['auth', 'info', 'username']));

  const toUpload = useCallback (() => {
    if (groupName) dispatch (setCurrentGroup (groupName));
  }, [groupName, dispatch]);

  return (
    <HeaderWrapper.Auth transparent={transparent}>
      {isAuthenticated ? (
        !username ? null
          : (
            <div>
              <NavLink to={`/${username}`} size="md" className="user-icon">
                <SVG icon="user" />
                <p>{username}</p>
              </NavLink>
              {type === 'upload' && (
                <Link to="/zabo/upload">
                  <button onClick={toUpload} type="button">업로드</button>
                </Link>
              )}
            </div>
          )
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
