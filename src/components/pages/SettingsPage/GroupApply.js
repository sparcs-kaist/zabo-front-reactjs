import React, {
  useCallback, useEffect, useMemo,
  useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';

import SimpleSelect from 'molecules/SimpleSelect';
import StyledQuill from 'organisms/StyledQuill';
import Footer from 'templates/Footer';
import Header from 'templates/Header';

import { applyNewGroup } from 'store/reducers/auth';
import useSetState from 'hooks/useSetState';
import { cropImage, dataURLToBlob } from 'lib/utils';
import { GROUP_CATEGORIES, GROUP_CATEGORIES_2, GROUP_CATEGORY_HIERARCHIY } from 'lib/variables';

import checkGray from 'static/images/check_gray.png';
import groupDefaultProfile from 'static/images/groupDefaultProfile.png';

import {
  AddCategoryW, BusinessW,
  ErrorComponent, FooterStyle, FormGroup, Page, Submit,
} from './Setting.styled';

const categoryOptions = GROUP_CATEGORIES.map (category => (
  { value: category, label: category }
));

const ApplyForm = ({ profilePhoto }) => {
  const dispatch = useDispatch ();
  const history = useHistory ();
  const myName = useSelector (state => state.getIn (['auth', 'info', 'username']));
  const [state, setState, onChange] = useSetState ({
    name: '',
    description: '',
    subtitle: '',
    purpose: '',
    categoryOption: categoryOptions[0],
    categoryOption2: '',
  });

  const [error, setError] = useState ();
  const {
    name, purpose, description, subtitle, categoryOption, categoryOption2,
  } = state;

  const hasHierarchy = categoryOption.value in GROUP_CATEGORY_HIERARCHIY;
  const categoryOptions2 = hasHierarchy
    ? GROUP_CATEGORY_HIERARCHIY[categoryOption.value].map (category => (
      { value: category, label: category }
    )) : [];

  useEffect (() => {
    setState ({ categoryOption2: categoryOptions2[0] });
  }, [categoryOption]);

  const isValid = useMemo (() => !!name && !!purpose && !!description && !!subtitle);

  const onChangeDescription = e => {
    setState ({ description: e });
  };

  const handleSubmit = useCallback (e => {
    e.preventDefault ();
    const category = categoryOption2 ? [categoryOption.value, categoryOption2.value] : [categoryOption.value];
    const formData = new FormData ();
    formData.append ('name', name);
    formData.append ('purpose', purpose);
    formData.append ('description', description);
    formData.append ('subtitle', subtitle);
    formData.append ('category', JSON.stringify (category));
    if (profilePhoto) {
      formData.append ('img', profilePhoto);
    }
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
          <label htmlFor="group-profile-category">소속</label>
        </FormGroup.Label>
        <AddCategoryW>
          <SimpleSelect
            value={categoryOption}
            options={categoryOptions}
            onChange={newOption => setState ({ categoryOption: newOption })}
            isClearable={false}
            width="100%"
          />
          {
            hasHierarchy && (
              <SimpleSelect
                value={categoryOption2}
                options={categoryOptions2}
                onChange={newOption => setState ({ categoryOption2: newOption })}
                isClearable={false}
                width="100%"
              />
            )
          }
        </AddCategoryW>
      </FormGroup>
      <FormGroup>
        <BusinessW>
          <div className="header">
            <div className="header-title">
              <h3>마케팅 목적으로 자보를 이용하고 싶다면?</h3>
              <p>* 기업이거나 마케팅 목적의 단체라면 비즈니스 계정버튼을 체크해주세요.</p>
            </div>
            <div className="business-btn">
              <Tooltip title="현재 지원히지 않습니다. 채널톡으로 문의주세요 :)">
                <button>
                  비즈니스 계정
                  <img src={checkGray} alt="check icon" />
                </button>
              </Tooltip>
            </div>
          </div>
        </BusinessW>
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
        <FooterStyle>
          <Submit type="submit" disabled={!isValid}>신청하기</Submit>
        </FooterStyle>
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
            <div className="button">사진 올리기</div>
          </label>
        </Page.Body.ProfileInfo>
        <ApplyForm profilePhoto={profilePhoto} />
      </Page.Body>
    </Page>
  );
};

export default GroupApply;
