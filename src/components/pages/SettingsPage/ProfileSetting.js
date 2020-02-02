import React, {
  useCallback, useEffect, useState, useRef, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import debounce from 'lodash.debounce';

import { validateName } from '../../../lib/utils';
import {
  PageWrapper, SubHeading, FormGroup, Label,
  Note, Success, Error, Submit, Hr,
} from './Setting.styled';
import { Page as ProfilePage } from '../ProfilePage/OldProfile.styled';
import InputBase from '../../atoms/InputBase';
import Header from '../../templates/Header';

import defaultBackground from '../../../static/hd/zhangjiajie-snow.jpg';
import defaultProfile from '../../../static/images/defaultProfile.png';
import { updateUserInfo } from '../../../store/reducers/auth';

import useSetState from '../../../hooks/useSetState';

const ProfileForm = ({ initialValue }) => {
  const dispatch = useDispatch ();
  const [state, setState, onChangeHandler] = useSetState ({
    ...initialValue,
    success: false,
    error: null,
  });

  const [nameInvalid, setNameInvalid] = useState (false);
  const {
    username, description, error, success,
  } = state;

  const handleSubmit = useCallback (e => {
    e.preventDefault ();
    const update = { username, description };
    dispatch (updateUserInfo (update))
      .then (() => setState ({ ...update, error: null, success: true }))
      .catch (error => setState ({ ...update, success: false, error }));
  }, [username, description]);

  const onChange = (e) => {
    setState ({ success: false, error: null });
    onChangeHandler (e);
  };

  const nameDebounce = useMemo (() => debounce (() => {
    // TODO: username: current e.target.username is not applying...
    // need to use e.target.value, or call 'nameDebounce' function inside onChange function, or...
    setNameInvalid (!validateName (username));
  }, 800), [state.username]);

  const onChangeName = e => {
    onChange (e);
    nameDebounce ();
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <Label>
          <label htmlFor="user-profile-name">별칭</label>
        </Label>
        <FormControl error>
          <InputBase
            id="user-profile-name"
            type="text"
            name="username"
            value={username}
            onChange={onChangeName}
          />
          {
            nameInvalid
              ? <FormHelperText id="user-profile-error">Error</FormHelperText>
              : ''
          }
        </FormControl>
        <Note>유저이름 변경</Note>
      </FormGroup>
      <FormGroup>
        <Label>
          <label htmlFor="user-profile-description">한 줄 자기소개</label>
        </Label>
        <InputBase
          id="user-profile-description"
          type="text"
          name="description"
          value={description}
          onChange={onChange}
        />
        <Note>한 줄 자기소개를 작성해주세요.</Note>
      </FormGroup>
      {error && <Error>{error.error}</Error>}
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
  const infoImmutable = useSelector (state => state.getIn (['auth', 'info']));
  const info = useMemo (() => infoImmutable.toJS (), [infoImmutable]);
  const {
    username = '', profilePhoto, backgroundPhoto, description = '',
  } = info;

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
