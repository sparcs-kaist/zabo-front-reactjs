import React from 'react';
import PropTypes from 'prop-types';
import { Page, Intro } from './Profile.styled';
import Header from '../../templates/Header';

import { GroupType } from '../../../lib/propTypes';

import defaultProfile from '../../../static/images/defaultProfile.png';
import groupDefaultProfile from '../../../static/images/groupDefaultProfile.png';

const GroupProfile = ({ profile }) => {
  const {
    name, profilePhoto, backgroundPhoto,
  } = profile;
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
          {name}
          <button>업로드</button>
        </Page.Header.UserInfo>
      </Page.Header>

      <Intro>
        <h1>소개</h1>
        <div>Hi, we are sparcs :)</div>
      </Intro>
    </Page>
  );
};

GroupProfile.propTypes = {
  profile: PropTypes.shape (GroupType).isRequired,
};

export default GroupProfile;
