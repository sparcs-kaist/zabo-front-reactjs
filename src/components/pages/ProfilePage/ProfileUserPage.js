import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { UserType } from '../../../lib/propTypes';
import { Page, Intro, Groups } from './Profile.styled';
import Header from '../../templates/Header';

import defaultProfile from '../../../static/images/default_profile.png';
import groupDefaultProfile from '../../../static/images/group_default_profile.png';

const UserProfile = ({ profile }) => {
  const {
    username, profilePhoto, backgroundPhoto, groups,
  } = profile;
  return (
    <Page>
      <Header rightGroup={<Header.AuthDropdown />} />
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
          <button>Sign Out</button>
        </Page.Header.UserInfo>
      </Page.Header>

      <Intro>
        <h1>소개</h1>
        <div>Hi, we are sparcs :)</div>
      </Intro>

      <Groups>
        <h1>그룹</h1>
        {groups.map (group => (
          <div>
            {
              group.profilePhoto
                ? <img src={group.profilePhoto} alt="group profile photo" />
                : <img src={groupDefaultProfile} alt="default group profile photo" />
            }
            <p>{group.name}</p>
          </div>
        ))}
      </Groups>
    </Page>
  );
};

UserProfile.propTypes = {
  profile: PropTypes.shape (UserType).isRequired,
};

export default UserProfile;
