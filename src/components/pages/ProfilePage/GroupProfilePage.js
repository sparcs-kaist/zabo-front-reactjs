import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Page, Intro } from './Profile.styled';
import Header from '../../templates/Header';

import { GroupType } from '../../../lib/propTypes';

import groupDefaultProfile from '../../../static/images/groupDefaultProfile.png';
import defaultBackground from '../../../static/hd/zhangjiajie-snow.jpg';
import { setCurrentGroup } from '../../../store/reducers/auth';

const GroupProfile = ({ profile }) => {
  const dispatch = useDispatch ();
  const {
    name, profilePhoto, backgroundPhoto, description,
  } = profile;
  const toUpload = useCallback (() => {
    dispatch (setCurrentGroup (name));
  }, [name]);

  return (
    <Page>
      <Header rightGroup={<Header.AuthButton />} />
      <Page.Header>
        <Page.Header.BackPhoto>
          {
            backgroundPhoto
              ? <div style={{ backgroundImage: `url(${backgroundPhoto})` }}> </div>
              : <div style={{ backgroundImage: `url(${defaultBackground})` }}> </div>
          }
        </Page.Header.BackPhoto>
        <Page.Header.ProfilePhoto>
          {
            profilePhoto
              ? <img src={profilePhoto} alt="profile photo" />
              : <img src={groupDefaultProfile} alt="default profile img" />
          }
        </Page.Header.ProfilePhoto>
        <Page.Header.UserInfo>
          {name}
          <Link to="/zabo/upload">
            <button onClick={toUpload} type="button">업로드</button>
          </Link>
        </Page.Header.UserInfo>
      </Page.Header>

      <Intro>
        <h1>소개</h1>
        <div>{description || '아직 소개가 없습니다.'}</div>
      </Intro>
    </Page>
  );
};

GroupProfile.propTypes = {
  profile: PropTypes.shape (GroupType).isRequired,
};

export default GroupProfile;
