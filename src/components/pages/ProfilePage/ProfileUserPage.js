import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { UserType } from '../../../lib/propTypes';
import { Page } from './Profile.styled';
import Header from '../../templates/Header';

const Groups = styled.div``;

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
              ? <img src={backgroundPhoto} alt="background photo" />
              : <div>Background placeholder</div>
          }
        </Page.Header.BackPhoto>
        <Page.Header.ProfilePhoto>
          {
            profilePhoto
              ? <img src={profilePhoto} alt="profile photo" />
              : <div>Profile photo placeholder</div>
          }
        </Page.Header.ProfilePhoto>
        {username}
      </Page.Header>

      <Groups>
        <h1>My Group</h1>
        {groups.map (group => (
          <div>
            Profile : {group.profilePhoto || 'no profile photo'}<br />
            {group.name}
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
