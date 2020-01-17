import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import { UserType } from '../../../lib/propTypes';
import { Page, Intro, Groups } from './Profile.styled';
import Header from '../../templates/Header';

import defaultProfile from '../../../static/images/defaultProfile.png';
import groupDefaultProfile from '../../../static/images/groupDefaultProfile.png';
import { logout as logoutAction } from '../../../store/reducers/auth';
import { selectAuthenticated } from '../../../lib/utils';

const UserProfile = ({ profile }) => {
  const dispatch = useDispatch ();
  const isAuthenticated = useSelector (selectAuthenticated);
  const {
    username, profilePhoto, backgroundPhoto, groups, description,
  } = profile;
  const logout = () => dispatch (logoutAction ());

  return (
    <Page>
      <Header rightGroup={<Header.AuthButton />} />
      <Page.Header>
        <Page.Header.BackPhoto>
          {
            backgroundPhoto
              ? <div style={{ backgroundImage: `url(${backgroundPhoto})` }}> </div>
              : <div>Background placeholder</div>
          }
        </Page.Header.BackPhoto>
        <Page.Header.ProfilePhoto>
          {
            profilePhoto
              ? <img src={profilePhoto} alt="profile photo" />
              : <img src={defaultProfile} alt="default profile img" />
          }
        </Page.Header.ProfilePhoto>
        <Page.Header.UserInfo>
          {username}
          {isAuthenticated && <button type="button" onClick={logout}>로그아웃</button>}
        </Page.Header.UserInfo>
      </Page.Header>

      <Intro>
        <h1>소개</h1>
        <div>{description}</div>
      </Intro>

      <Groups>
        <h1>그룹</h1>
        <Groups.List>
          {groups.map (group => (
            <Link to={group.name} key={group.name}>
              <Groups.ListItem>
                {
                group.profilePhoto
                  ? <img src={group.profilePhoto} alt="group profile photo" />
                  : <img src={groupDefaultProfile} alt="default group profile photo" />
              }
                <Tooltip title={group.name}>
                  <div className="group-name">{group.name}</div>
                </Tooltip>
              </Groups.ListItem>
            </Link>
          ))}
        </Groups.List>
      </Groups>
    </Page>
  );
};

UserProfile.propTypes = {
  profile: PropTypes.shape (UserType).isRequired,
};

export default UserProfile;
