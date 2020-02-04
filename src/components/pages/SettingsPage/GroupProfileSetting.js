import React, {
  useCallback, useEffect, useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import withGroupProfile from './withGroupProfile';
import {
  Page, FormGroup, Submit, Error,
} from './Setting.styled';
import Header from '../../templates/Header';
import Footer from '../../templates/Footer';

import groupDefaultProfile from '../../../static/images/groupDefaultProfile.png';
import { updateGroupInfo } from '../../../store/reducers/auth';

import useSetState from '../../../hooks/useSetState';
import { GroupType } from '../../../lib/propTypes';

const ProfileForm = ({ initialValue }) => {
  const dispatch = useDispatch ();
  const history = useHistory ();
  const [state, setState, onChange] = useSetState (initialValue);
  useEffect (() => setState (initialValue), [initialValue]);
  const [error, setError] = useState ();
  const { name, description, subtitle } = state;

  const handleSubmit = useCallback (e => {
    e.preventDefault ();
    // TODO need to update 'subtitle' together
    dispatch (updateGroupInfo ({ curName: initialValue.name, name, description }))
      .then ((info) => {
        history.replace (`/settings/group/${name}/profile`);
        history.push (`/${name}`);
      })
      .catch (err => setError (err));
  }, [state]);

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <FormGroup.Label>
          <label htmlFor="user-profile-name">그룹명</label>
        </FormGroup.Label>
        <input
          id="user-profile-name"
          type="text"
          name="name"
          value={name}
          onChange={onChange}
        />
      </FormGroup>
      <FormGroup>
        <FormGroup.Label>
          <label htmlFor="user-profile-description">그룹 한줄 소개</label>
        </FormGroup.Label>
        <input
          placeholder="소개글을 추가해주세요."
          multiline
          rows="5"
          fullWidth
          name="description"
          value={description}
          onChange={onChange}
        />
      </FormGroup>
      {error && <Error>{error.message}</Error>}
      <Footer scrollFooter>
        <Submit type="submit">수정하기</Submit>
      </Footer>
    </form>
  );
};

ProfileForm.propTypes = {
  initialValue: PropTypes.shape ({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

const GroupProfileSetting = ({ profile }) => {
  const {
    name = '', profilePhoto, description = '', subtitle = '',
  } = profile;

  return (
    <Page>
      <Header rightGroup={<Header.AuthButton />} scrollHeader />
      <Page.Body>
        <h1>그룹 프로필 편집</h1>
        <p>그룹 프로필을 수정할 수 있습니다.</p>
        <Page.Body.ProfileInfo>
          {
            profilePhoto
              ? <img src={profilePhoto} alt="profile photo" />
              : <img src={groupDefaultProfile} alt="default profile img" />
          }
          <button>사진 바꾸기</button>
        </Page.Body.ProfileInfo>
        <ProfileForm initialValue={{ name, description }} />
      </Page.Body>
    </Page>
  );
};

GroupProfileSetting.propTypes = {
  profile: GroupType.isRequired,
};

export default withGroupProfile (GroupProfileSetting, true);
