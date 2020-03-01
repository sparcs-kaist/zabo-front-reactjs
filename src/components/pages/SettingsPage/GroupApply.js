import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import StyledQuill from 'organisms/StyledQuill';
import Footer from 'templates/Footer';
import Header from 'templates/Header';

import { applyNewGroup } from 'store/reducers/auth';
import useSetState from 'hooks/useSetState';
import { cropImage, dataURLToBlob } from 'lib/utils';

import groupDefaultProfile from 'static/images/groupDefaultProfile.png';

import {
  ErrorComponent, FormGroup, Page, Submit,
} from './Setting.styled';

const ApplyForm = ({ profilePhoto }) => {
  const dispatch = useDispatch ();
  const history = useHistory ();
  const myName = useSelector (state => state.getIn (['auth', 'info', 'username']));
  const [state, setState, onChange] = useSetState ({
    name: '',
    description: '',
    subtitle: '',
    purpose: '',
  });

  const [error, setError] = useState ();
  const {
    name, purpose, description, subtitle,
  } = state;
  const onChangeDescription = e => {
    setState ({ description: e });
  };

  const handleSubmit = useCallback (e => {
    e.preventDefault ();
    const formData = new FormData ();
    formData.append ('name', name);
    formData.append ('purpose', purpose);
    formData.append ('description', description);
    formData.append ('subtitle', subtitle);
    formData.append ('category', JSON.stringify (['관리자', '관리자']));
    formData.append ('img', profilePhoto);
    dispatch (applyNewGroup (formData))
      .then (() => {
        history.push (`/${myName}`);
      })
      .catch (err => setError (err));
  }, [state, profilePhoto]);

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <FormGroup.Label>
          <label htmlFor="group-profile-name">그룹명</label>
        </FormGroup.Label>
        <input
          id="group-profile-name"
          type="text"
          name="name"
          value={name}
          onChange={onChange}
          placeholder="그룹명을 알려주세요."
        />
      </FormGroup>
      <FormGroup>
        <FormGroup.Label>
          <label htmlFor="group-profile-purpose">그룹 생성 목적</label>
        </FormGroup.Label>
        <input
          placeholder="그룹 생성 목적을 간략히 알려주세요."
          name="purpose"
          value={purpose}
          onChange={onChange}
        />
      </FormGroup>
      <FormGroup>
        <FormGroup.Label>
          <label htmlFor="group-profile-description">그룹 한줄 소개</label>
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
          <label htmlFor="group-profile-description">그룹 설명</label>
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
      {error && <ErrorComponent>{error.message}</ErrorComponent>}
      <Footer scrollFooter>
        <Submit type="submit">제출하기</Submit>
      </Footer>
    </form>
  );
};

const GroupApply = () => {
  const [profilePreview, setProfilePreview] = useState ('');
  const [profilePhoto, setProfilePhoto] = useState (null);

  const handlePhotoChange = async e => {
    const file = e.target.files[0];
    const imageSrc = await cropImage (file, 1);
    const blob = dataURLToBlob (imageSrc);
    setProfilePhoto (blob);
    setProfilePreview (imageSrc);
  };

  return (
    <Page>
      <Header scrollHeader />
      <Page.Body>
        <h1>그룹 신청</h1>
        <p>자보에 새 그룹을 등록해보세요.</p>
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
        <ApplyForm profilePhoto={profilePhoto} />
      </Page.Body>
    </Page>
  );
};

export default GroupApply;
