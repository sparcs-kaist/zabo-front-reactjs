import React, {
  useCallback, useEffect, useState, useRef,
} from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import {
  PageWrapper, SubHeading, FormGroup, Label,
  Note, Success, Error, Submit, Hr,
} from './Setting.styled';
import { Page as ProfilePage } from '../ProfilePage/OldProfile.styled';
import InputBase from '../../atoms/InputBase';
import Header from '../../templates/Header';

import defaultBackground from '../../../static/hd/zhangjiajie-snow.jpg';
import groupDefaultProfile from '../../../static/images/groupDefaultProfile.png';
import { getProfile } from '../../../store/reducers/profile';
import { updateGroupInfo } from '../../../store/reducers/auth';

import useSetState from '../../../hooks/useSetState';

const ProfileForm = ({ initialValue }) => {
  const dispatch = useDispatch ();
  const [state, setState, onChange] = useSetState (initialValue);
  useEffect (() => setState (initialValue), [initialValue]);
  const [error, setError] = useState ();
  const [success, setSuccess] = useState (false);
  const { name, description } = state;

  const handleSubmit = useCallback (e => {
    e.preventDefault ();
    dispatch (updateGroupInfo ({ name, description }))
      .then ((info) => setSuccess (true))
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
      {success && <Success>성공</Success>}
      <Submit type="submit">변경 사항 저장하기</Submit>
    </form>
  );
};

const GroupProfileSetting = (props) => {
  const dispatch = useDispatch ();
  const { groupName } = props;
  const prevProfile = useRef ();

  useEffect (() => {
    const clear = false;
    dispatch (getProfile (groupName, clear))
      .then (() => {})
      .catch (error => {});
  }, [groupName]);

  const profileImmutable = useSelector (state => state.getIn (['profile', 'profiles', groupName]));
  const profile = profileImmutable ? profileImmutable.toJS () : prevProfile.current || {};
  if (profileImmutable) prevProfile.current = profile;
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
  groupName: PropTypes.string.isRequired,
};

export default GroupProfileSetting;
