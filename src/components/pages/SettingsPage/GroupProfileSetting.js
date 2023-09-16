import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import SimpleSelect from "components/molecules/SimpleSelect";
import StyledQuill from "components/organisms/StyledQuill";
import Footer from "components/templates/Footer";
import Header from "components/templates/Header";

import { updateGroupInfo, updateGroupInfoWithImage } from "store/reducers/auth";
import useSetState from "hooks/useSetState";
import { GroupType } from "lib/propTypes";
import { cropImage, dataURLToBlob } from "lib/utils";
import { GROUP_CATEGORIES, GROUP_CATEGORIES_2, GROUP_CATEGORY_HIERARCHIY } from "lib/variables";

import groupDefaultProfile from "static/images/groupDefaultProfile.png";

import {
  AddCategoryW,
  ErrorComponent,
  FooterStyle,
  FormGroup,
  Page,
  Submit,
} from "./Setting.styled";
import withGroupProfile from "./withGroupProfile";

const categoryOptions = GROUP_CATEGORIES.map((category) => ({ value: category, label: category }));

const selectForm = (category) => ({ value: category, label: category });

const ProfileForm = ({ initialValue, category, newProfilePhoto }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [state, setState, onChange] = useSetState(initialValue);
  const [categoryOption, setCategoryOption] = useState(selectForm(category[0]));
  const [categoryOption2, setCategoryOption2] = useState(
    category.length > 1 ? selectForm(category[1]) : "",
  );
  useEffect(() => setState(initialValue), [initialValue]);
  const [error, setError] = useState();
  const { name, description, subtitle } = state;

  const hasHierarchy = categoryOption.value in GROUP_CATEGORY_HIERARCHIY;
  const categoryOptions2 = hasHierarchy
    ? GROUP_CATEGORY_HIERARCHIY[categoryOption.value].map((category) => ({
        value: category,
        label: category,
      }))
    : [];

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const category = categoryOption2
        ? [categoryOption.value, categoryOption2.value]
        : [categoryOption.value];
      let updateCall = () =>
        dispatch(
          updateGroupInfo({
            curName: initialValue.name,
            name,
            description,
            subtitle,
            category: JSON.stringify(category),
          }),
        );
      if (newProfilePhoto) {
        const category = categoryOption2
          ? [categoryOption.value, categoryOption2.value]
          : [categoryOption.value];
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("subtitle", subtitle);
        formData.append("category", JSON.stringify(category));
        formData.append("img", newProfilePhoto);
        updateCall = () =>
          dispatch(updateGroupInfoWithImage({ curName: initialValue.name, formData }));
      }

      updateCall()
        .then(() => {
          history.replace(`/settings/group/${name}/profile`);
          history.push(`/${name}`);
        })
        .catch((err) => {
          setError(err);
          alert(err.error);
        });
    },
    [state, categoryOption, categoryOption2],
  );

  const onChangeDescription = (e) => {
    setState({ description: e });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <FormGroup.Label required>
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
            onChange={(newOption) => {
              setCategoryOption(newOption);
              // newOption.value
              const hasHierarchy = newOption.value in GROUP_CATEGORY_HIERARCHIY;
              const categoryOptions2 = hasHierarchy
                ? GROUP_CATEGORY_HIERARCHIY[newOption.value].map((category) => ({
                    value: category,
                    label: category,
                  }))
                : [];
              setCategoryOption2(categoryOptions2[0]);
            }}
            isClearable={false}
            width="100%"
          />
          {hasHierarchy && (
            <SimpleSelect
              value={categoryOption2}
              options={categoryOptions2}
              onChange={(newOption) => setCategoryOption2(newOption)}
              isClearable={false}
              width="100%"
            />
          )}
        </AddCategoryW>
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
              ["bold", "underline", "strike"],
              [{ list: "ordered" }, { list: "bullet" }, { indent: "+1" }, { indent: "-1" }],
              ["link"],
            ],
          }}
          groupSetting
        />
      </FormGroup>
      {error && <ErrorComponent>{error.message}</ErrorComponent>}
      <Footer scrollFooter>
        <FooterStyle>
          <Submit type="submit">수정하기</Submit>
        </FooterStyle>
      </Footer>
    </form>
  );
};

ProfileForm.propTypes = {
  initialValue: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  newProfilePhoto: PropTypes.object,
};

const GroupProfileSetting = ({ profile }) => {
  const { name = "", profilePhoto, description = "", subtitle = "", category = [] } = profile;

  const [profilePreview, setProfilePreview] = useState(profilePhoto);
  const [newProfilePhoto, setNewProfilePhoto] = useState(null);

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    const imageSrc = await cropImage(file, 1);
    const blob = dataURLToBlob(imageSrc);
    setNewProfilePhoto(blob);
    setProfilePreview(imageSrc);
  };

  return (
    <Page>
      <Header scrollHeader />
      <Page.Body>
        <h1>그룹 프로필 편집</h1>
        <p>그룹 프로필을 수정할 수 있습니다.</p>
        <Page.Body.ProfileInfo>
          {profilePreview ? (
            <img src={profilePreview} alt="profile photo" />
          ) : (
            <img src={groupDefaultProfile} alt="default profile img" />
          )}
          <input
            id="profile-photo"
            type="file"
            name="profilePhoto"
            accept="image/*"
            onChange={handlePhotoChange}
            style={{ display: "none" }}
          />
          <label htmlFor="profile-photo">
            <div className="button">사진 바꾸기</div>
          </label>
        </Page.Body.ProfileInfo>
        <ProfileForm
          initialValue={{ name, description, subtitle }}
          category={category}
          newProfilePhoto={newProfilePhoto}
        />
      </Page.Body>
    </Page>
  );
};

GroupProfileSetting.propTypes = {
  profile: GroupType.isRequired,
};

export default withGroupProfile(GroupProfileSetting, true);
