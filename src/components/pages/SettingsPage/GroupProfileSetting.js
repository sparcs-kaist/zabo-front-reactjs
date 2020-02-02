import React, {
  useCallback, useEffect, useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import withGroupProfile from './withGroupProfile';
import {
  PageWrapper, SubHeading, FormGroup, Label,
  Note, Error, Submit, Hr,
} from './Old.Setting.styled';
import { Page as ProfilePage } from '../ProfilePage/OldProfile.styled';
import InputBase from '../../atoms/InputBase';
import Header from '../../templates/Header';

import defaultBackground from '../../../static/hd/zhangjiajie-snow.jpg';
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
  const { name, description } = state;

  const handleSubmit = useCallback (e => {
    e.preventDefault ();
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
        <Label>
          <label htmlFor="user-profile-name">별칭</label>
        </Label>
        <InputBase
          id="user-profile-name"
          type="text"
          name="name"
          value={name}
          onChange={onChange}
        />
        <Note>유저이름 변경</Note>
      </FormGroup>
      <FormGroup>
        <Label>
          <label htmlFor="user-profile-description">소개글</label>
        </Label>
        <InputBase
          placeholder="소개글을 추가해주세요."
          multiline
          rows="5"
          fullWidth
          name="description"
          value={description}
          onChange={onChange}
        />
        <Note>한 줄 자기소개를 작성해주세요.</Note>
      </FormGroup>
      {error && <Error>{error.message}</Error>}
      <Submit type="submit">변경 사항 저장하기</Submit>
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
    name = '', profilePhoto, backgroundPhoto, description = '',
  } = profile;

  return (
    <PageWrapper>
      <Header rightGroup={<Header.AuthButton />} />
      <ProfilePage.Header>
        <ProfilePage.Header.BackPhoto>
          {
            backgroundPhoto
              ? <div style={{ backgroundImage: `url(${backgroundPhoto})` }}> </div>
              : <div style={{ backgroundImage: `url(${defaultBackground})` }}> </div>
          }
        </ProfilePage.Header.BackPhoto>
        <ProfilePage.Header.ProfilePhoto>
          {
            profilePhoto
              ? <img src={profilePhoto} alt="profile photo" />
              : <img src={groupDefaultProfile} alt="default profile img" />
          }
        </ProfilePage.Header.ProfilePhoto>
        <ProfilePage.Header.UserInfo>
          {name}
        </ProfilePage.Header.UserInfo>
      </ProfilePage.Header>

      <SubHeading>
        <SubHeading.Text>프로필 설정</SubHeading.Text>
      </SubHeading>

      <ProfileForm initialValue={{ name, description }} />
      <Hr />
    </PageWrapper>
  );
};

GroupProfileSetting.propTypes = {
  profile: GroupType.isRequired,
};

export default withGroupProfile (GroupProfileSetting, true);
