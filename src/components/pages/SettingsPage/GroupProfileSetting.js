import React, {
  useCallback, useEffect, useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import StyledQuill from '../../organisms/StyledQuill';
import withGroupProfile from './withGroupProfile';
import {
  Page, FormGroup, Submit, Error,
} from './Setting.styled';
import Header from '../../templates/Header';
import Footer from '../../templates/Footer';

import groupDefaultProfile from '../../../static/images/groupDefaultProfile.png';
import { updateGroupInfo, updateGroupInfoWithImage } from '../../../store/reducers/auth';

import useSetState from '../../../hooks/useSetState';
import { GroupType } from '../../../lib/propTypes';
import { cropImage, dataURLToBlob } from '../../../lib/utils';

const ProfileForm = ({ initialValue, newProfilePhoto }) => {
  const dispatch = useDispatch ();
  const history = useHistory ();
  const [state, setState, onChange] = useSetState (initialValue);
  useEffect (() => setState (initialValue), [initialValue]);
  const [error, setError] = useState ();
  const { name, description, subtitle } = state;

  const handleSubmit = useCallback (e => {
    e.preventDefault ();
    let updateCall = () => dispatch (updateGroupInfo ({
      curName: initialValue.name, name, description, subtitle,
    }));
    if (newProfilePhoto) {
      const formData = new FormData ();
      formData.append ('name', name);
      formData.append ('description', description);
      formData.append ('subtitle', subtitle);
      formData.append ('img', newProfilePhoto);
      updateCall = () => dispatch (updateGroupInfoWithImage ({ curName: initialValue.name, formData }));
    }

    updateCall ()
      .then (() => {
        history.replace (`/settings/group/${name}/profile`);
        history.push (`/${name}`);
      })
      .catch (err => setError (err));
  }, [state]);

  const onChangeDescription = e => {
    setState ({ description: e });
  };

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
          placeholder="그룹에 대해 한줄로 설명해주세요."
          name="subtitle"
          value={subtitle}
          onChange={onChange}
        />
      </FormGroup>
      <FormGroup>
        <FormGroup.Label>
          <label htmlFor="user-profile-description">그룹 설명</label>
        </FormGroup.Label>
        <StyledQuill
          placeholder="그룹에 대해 자세하게 설명해주세요."
          value={description}
          onChange={onChangeDescription}
          theme="bubble"
          modules={{
            toolbar: [
              ['bold', 'underline', 'strike'],
              [{ list: 'ordered' }, { list: 'bullet' }, { indent: '+1' }, { indent: '-1' }],
              ['link'],
            ],
          }}
          groupSetting
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
  // eslint-disable-next-line react/forbid-prop-types
  newProfilePhoto: PropTypes.object,
};

const GroupProfileSetting = ({ profile }) => {
  const {
    name = '', profilePhoto, description = '', subtitle = '',
  } = profile;

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
        <h1>그룹 프로필 편집</h1>
        <p>그룹 프로필을 수정할 수 있습니다.</p>
        <Page.Body.ProfileInfo>
          {
            profilePreview
              ? <img src={profilePreview} alt="profile photo" />
              : <img src={groupDefaultProfile} alt="default profile img" />
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
        <ProfileForm initialValue={{ name, description, subtitle }} newProfilePhoto={newProfilePhoto} />
      </Page.Body>
    </Page>
  );
};

GroupProfileSetting.propTypes = {
  profile: GroupType.isRequired,
};

export default withGroupProfile (GroupProfileSetting, true);
