import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import get from 'lodash.get';

import SuperTooltip from 'atoms/SuperTooltip';
import StyledQuill from 'organisms/StyledQuill';
import { Page } from 'pages/ProfilePage/Profile.styled';

import groupDefaultProfile from 'static/images/groupDefaultProfile.png';

import GridContainer from './components/Grid/GridContainer';
import UserCard from './UserCard';

const GroupDetailPage = ({ match }) => {
  const { name } = match.params;
  const group = useSelector (state => get (state, ['admin', 'groupsMap', name]));
  if (!group) return null;
  const {
    profilePhoto, members, recentUpload, description, subtitle,
  } = group;

  return (
    <div>
      <Page.Header>
        <Page.Header.Left>
          <Page.Header.Left.ProfilePhoto>
            {
              profilePhoto
                ? <img src={profilePhoto} alt="profile photo" />
                : <img src={groupDefaultProfile} alt="default profile img" />
            }
          </Page.Header.Left.ProfilePhoto>
          <Page.Header.Left.UserInfo>
            <h1>{name}</h1>
            <SuperTooltip title={subtitle}>
              <p>{subtitle || '아직 소개가 없습니다.'}</p>
            </SuperTooltip>
          </Page.Header.Left.UserInfo>
        </Page.Header.Left>
      </Page.Header>
      <Page.Body>
        <Page.Body.Group>
          <StyledQuill
            theme="bubble"
            readOnly
            value={description}
          />
        </Page.Body.Group>
        <h3>Members</h3>
        <GridContainer>
          {members.map (member => (
            <UserCard user={member.user} />
          ))}
        </GridContainer>
      </Page.Body>
    </div>
  );
};

export default GroupDetailPage;
