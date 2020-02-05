import React, {
  useCallback, useState, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import debounce from 'lodash.debounce';

import { validateName, dataURLToBlob, cropImage } from '../../../lib/utils';
import {
  Page, FormGroup, Submit, Success, Error,
} from './Setting.styled';
import Header from '../../templates/Header';
import Footer from '../../templates/Footer';

import defaultProfile from '../../../static/images/defaultProfile.png';
import { updateUserInfo, updateUserInfoWithImage } from '../../../store/reducers/auth';

import useSetState from '../../../hooks/useSetState';

const ProfileForm = ({ initialValue, newProfilePhoto }) => {
  const dispatch = useDispatch ();
  const history = useHistory ();
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
    let updateCall = () => dispatch (updateUserInfo (update));
    if (newProfilePhoto) {
      const formData = new FormData ();
      formData.append ('img', newProfilePhoto);
      formData.append ('username', username);
      formData.append ('description', description);
      updateCall = () => dispatch (updateUserInfoWithImage (formData));
    }
    updateCall ()
      .then (() => history.push (`/${username}`))
      .catch (error => setState ({ ...update, success: false, error }));
  }, [username, description, newProfilePhoto]);

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
        <FormGroup.Label>
          <label htmlFor="user-profile-name">이름</label>
        </FormGroup.Label>
        <FormControl style={{ width: '100%' }} error>
          <input
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
      </FormGroup>
      <FormGroup>
        <FormGroup.Label>
          <label htmlFor="user-profile-description">한줄 소개</label>
        </FormGroup.Label>
        <input
          id="user-profile-description"
          type="text"
          name="description"
          value={description}
          onChange={onChange}
        />
      </FormGroup>
      {error && <Error>{error.error}</Error>}
      {success && <Success>성공</Success>}
      <Footer scrollFooter>
        <Submit type="submit">수정 완료</Submit>
      </Footer>
    </form>
  );
};

ProfileForm.propTypes = {
  initialValue: PropTypes.shape ({
    username: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  newProfilePhoto: PropTypes.object,
};

const UserProfileSetting = (props) => {
  const infoImmutable = useSelector (state => state.getIn (['auth', 'info']));
  const info = useMemo (() => infoImmutable.toJS (), [infoImmutable]);
  const { username = '', profilePhoto, description = '' } = info;

  const [profilePreview, setProfilePreview] = useState (profilePhoto);
  const [newProfilePhoto, setNewProfilePhoto] = useState (null);

  const handlePhotoChange = async e => {
    const file = e.target.files[0];
    const imageSrc = await cropImage (file, 1);
    const blob = dataURLToBlob (imageSrc);
    setNewProfilePhoto (blob);
    setProfilePreview (imageSrc);
  };

  return (
    <Page>
      <Header rightGroup={<Header.AuthButton />} scrollHeader />
      <Page.Body>
        <h1>프로필 편집</h1>
        <p>프로필을 수정할 수 있습니다.</p>
        <Page.Body.ProfileInfo>
          {
            profilePreview
              ? <img src={profilePreview} alt="profile photo" />
              : <img src={defaultProfile} alt="default profile img" />
          }
          <input
            id="profile-photo"
            type="file"
            name="profilePhoto"
            accept="image/*"
            onChange={handlePhotoChange}
            style={{ display: 'none' }}
          />
          <label
            htmlFor="profile-photo"
          >
            <div className="button">사진 바꾸기</div>
          </label>
        </Page.Body.ProfileInfo>
        <ProfileForm initialValue={{ username, description }} newProfilePhoto={newProfilePhoto} />
      </Page.Body>
    </Page>
  );
};

UserProfileSetting.propTypes = {};

export default UserProfileSetting;
