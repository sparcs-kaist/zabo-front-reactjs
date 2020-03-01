import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';

import StyledQuill from 'organisms/StyledQuill';
import Header from 'templates/Header';
import { Page } from 'pages/ProfilePage/Profile.styled';

import { jsonStringify } from 'lib/utils';

import defaultProfile from 'static/images/defaultProfile.png';

const UserDetailPage = ({ match }) => {
  const { username } = match.params;
  const userIm = useSelector (state => state.getIn (['admin', 'usersMap', username]));
  const user = useMemo (() => (userIm ? userIm.toJS () : null), [userIm]);
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
            <Tooltip title={description}>
              <p>{description || '아직 소개가 없습니다.'}</p>
            </Tooltip>
          </Page.Header.Left.UserInfo>
        </Page.Header.Left>
      </Page.Header>
      <Page.Body>
        <Page.Body.User>

        </Page.Body.User>
      </Page.Body>
    </div>
  );
};

export default UserDetailPage;
