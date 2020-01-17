import React, {
  useCallback, useEffect, useState, useRef,
} from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { Page as ProfilePage } from '../ProfilePage/Profile.styled';
import Header from '../../templates/Header';

import defaultProfile from '../../../static/images/defaultProfile.png';
import { getProfile } from '../../../store/reducers/profile';
import { updateUserInfo } from '../../../store/reducers/auth';

import useSetState from '../../../hooks/useSetState';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
`;
const SubHeading = styled.div`
  padding-bottom: 8px;
  margin-bottom: 16px;
  border-bottom: 1px solid #e1e4e8;
`;
SubHeading.Text = styled.h2`
  font-size: 24px;
`;
const FormGroup = styled.div`
  margin: 15px 0;
`;
const Label = styled.div`
  font-weight: bold;
  margin: 0 0 6px;
`;
const Input = styled.input`
  width: 440px;
  max-width: 100%;
  background-color: #fafbfc;
  min-height: 34px;
  padding: 6px 8px;
  font-size: 14px;
  line-height: 20px;
  color: #24292e;
  vertical-align: middle;
  outline: none;
  border: 1px solid #d1d5da;
  border-radius: 3px;
  box-shadow: inset 0 1px 2px rgba(27,31,35,.075);
`;
const Note = styled.div`
  min-height: 17px;
  margin: 4px 0 2px;
  font-size: 12px;
  color: #586069;
`;
const Button = styled.button`
  position: relative;
  display: inline-block;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  background-repeat: repeat-x;
  background-position: -1px -1px;
  background-size: 110% 110%;
  border: 1px solid rgba(27,31,35,.2);
  border-radius: .25em;
`;
const Success = styled.div`
  color: green;
`;
const Error = styled.div`
  color: red;
`;
const Submit = styled (Button)`
  color: #fff;
  background-color: #28a745;
  background-image: linear-gradient(-180deg,#34d058,#28a745 90%);
`;
const Hr = styled.hr`
  height: 0;
  margin: 15px 0;
  overflow: hidden;
  background: transparent;
  border: 0;
  border-bottom: 1px solid #dfe2e5;
`;

const ProfileForm = ({ initialValue }) => {
  const dispatch = useDispatch ();
  const [state, setState, onChange] = useSetState (initialValue);
  useEffect (() => setState (initialValue), [initialValue]);
  const [error, setError] = useState ();
  const [success, setSuccess] = useState (false);
  const { username, description } = state;

  const handleSubmit = useCallback (e => {
    e.preventDefault ();
    const data = {};
    if (username !== initialValue.username) data.username = username;
    if (description !== initialValue.description) data.description = description;
    dispatch (updateUserInfo (data))
      .then (() => setSuccess (true))
      .catch (err => setError (err));
  }, [state]);

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <Label>
          <label htmlFor="user-profile-name">별칭</label>
        </Label>
        <Input
          id="user-profile-name"
          type="text"
          name="username"
          value={username}
          onChange={onChange}
        />
        <Note>유저이름 변경</Note>
      </FormGroup>
      <FormGroup>
        <Label>
          <label htmlFor="user-profile-description">한 줄 자기소개</label>
        </Label>
        <Input
          id="user-profile-description"
          type="text"
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

ProfileForm.propTypes = {
  initialValue: PropTypes.shape ({
    username: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

const UserProfileSetting = (props) => {
  const dispatch = useDispatch ();
  const myName = useSelector (state => state.getIn (['auth', 'info', 'username']));
  const prevMyNameRef = useRef ('');
  const prevMyName = prevMyNameRef.current;
  const prevProfile = useRef ();
  useEffect (() => {
    const clear = myName !== prevMyName ? prevMyName : undefined;
    dispatch (getProfile (myName, clear))
      .then (() => {
        prevMyNameRef.current = myName;
      })
      .catch (error => {});
  }, [myName]);
  const profileImmutable = useSelector (state => state.getIn (['profile', 'profiles', myName]));
  const profile = profileImmutable ? profileImmutable.toJS () : prevProfile.current || {};
  if (profileImmutable) prevProfile.current = profile;
  const {
    username = '', profilePhoto, backgroundPhoto, description = '',
  } = profile;

  return (
    <PageWrapper>
      <Header rightGroup={<Header.AuthButton />} />
      <ProfilePage.Header>
        <ProfilePage.Header.BackPhoto>
          {
            backgroundPhoto
              ? <div style={{ backgroundImage: `url(${backgroundPhoto})` }}> </div>
              : <div>Background placeholder</div>
          }
        </ProfilePage.Header.BackPhoto>
        <ProfilePage.Header.ProfilePhoto>
          {
            profilePhoto
              ? <img src={profilePhoto} alt="profile photo" />
              : <img src={defaultProfile} alt="default profile img" />
          }
        </ProfilePage.Header.ProfilePhoto>
        <ProfilePage.Header.UserInfo>
          {username}
        </ProfilePage.Header.UserInfo>
      </ProfilePage.Header>

      <SubHeading>
        <SubHeading.Text>프로필 설정</SubHeading.Text>
      </SubHeading>

      <ProfileForm initialValue={{ username, description }} />
      <Hr />
      <h3>그룹 보이기 / 숨기기</h3>
      <h3>저장한 자보 보이기 / 숨기기</h3>
    </PageWrapper>
  );
};

UserProfileSetting.propTypes = {};

export default UserProfileSetting;
