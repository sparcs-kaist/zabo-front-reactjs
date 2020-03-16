import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import get from 'lodash.get';

import SuperTooltip from 'atoms/SuperTooltip';
import Header from 'templates/Header';
import { Page } from 'pages/ProfilePage/Profile.styled';

import defaultProfile from 'static/images/defaultProfile.png';

import UserInfo from './UserInfo';

const UserDetailPage = ({ match }) => {
  const { username } = match.params;
  const user = useSelector (state => get (state, ['admin', 'usersMap', username]));
  if (!user) return null;
  const {
    _id, profilePhoto, createdAt, groups,
    birthday, email, name, kaistEmail, kaistPersonType, kaistStatus, koreanName,
    flags, description,
  } = user;

  return (
    <div>
      <Header type="upload" scrollHeader />
      <Page.Header>
        <Page.Header.Left>
          <Page.Header.Left.ProfilePhoto>
            {
              profilePhoto
                ? <img src={profilePhoto} alt="profile photo" />
                : <img src={defaultProfile} alt="default profile img" />
            }
          </Page.Header.Left.ProfilePhoto>
          <Page.Header.Left.UserInfo>
            <h1>{username}</h1>
            <SuperTooltip title={description}>
              <p>{description || '아직 소개가 없습니다.'}</p>
            </SuperTooltip>
          </Page.Header.Left.UserInfo>
        </Page.Header.Left>
      </Page.Header>
      <Page.Body>
        <Page.Body.User>
          <UserInfo user={user} />
        </Page.Body.User>
      </Page.Body>
    </div>
  );
};

export default UserDetailPage;
