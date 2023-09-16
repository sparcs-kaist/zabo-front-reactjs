import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import get from "lodash.get";

import SuperTooltip from "components/atoms/SuperTooltip";
import ProfileStats from "components/organisms/ProfileStats";
import StyledQuill from "components/organisms/StyledQuill";
import Header from "components/templates/Header";
import ZaboList from "components/templates/ZaboList";

import { followProfile } from "store/reducers/profile";
import { GroupType } from "lib/propTypes";
import { getLabeledTimeDiff, isAuthedSelector, isElemWidthOverflown, withAuth } from "lib/utils";
import { mediaSizes } from "lib/utils/style";

import groupDefaultProfile from "static/images/groupDefaultProfile.png";

import { Page, Zabos } from "./Profile.styled";

const GroupProfile = ({ profile }) => {
  const {
    name,
    profilePhoto,
    members,
    zabosCount,
    followersCount,
    recentUpload,
    description = "",
    subtitle = "",
    myRole,
    following,
  } = profile;
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuthed = useSelector(isAuthedSelector);
  const width = useSelector((state) => get(state, ["app", "windowSize", "width"]));
  const isMobile = useMemo(() => mediaSizes.tablet > width, [width]);

  const descRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const follow = useCallback(() => {
    if (withAuth(history, isAuthed)) dispatch(followProfile({ name }));
  }, [name]);
  useEffect(() => {
    setShowTooltip(isElemWidthOverflown(descRef.current));
  }, [descRef, width]);

  const timePast = recentUpload ? getLabeledTimeDiff(recentUpload, 60, 60, 24, 7, 5, 12) : "없음";
  const stats = [
    {
      name: "올린 자보",
      value: zabosCount,
    },
    {
      name: "팔로워",
      value: followersCount,
    },
    {
      name: "최근 활동",
      value: timePast,
    },
  ];

  return (
    <Page>
      <Header type="upload" groupName={name} scrollHeader />
      <Page.Header>
        <Page.Header.Left>
          <Page.Header.Left.ProfilePhoto>
            {profilePhoto ? (
              <img src={profilePhoto} alt="profile photo" />
            ) : (
              <img src={groupDefaultProfile} alt="default profile img" />
            )}
          </Page.Header.Left.ProfilePhoto>
          <Page.Header.Left.UserInfo>
            <h1>{name}</h1>
            <SuperTooltip title={subtitle} hide={!showTooltip}>
              <p ref={descRef}>{subtitle || "아직 소개가 없습니다."}</p>
            </SuperTooltip>
            <section>
              {myRole ? (
                <>
                  <Link to={`/settings/group/${name}/profile`}>
                    <button type="button">{isMobile ? "편집" : "프로필 편집"}</button>
                  </Link>
                  {myRole === "admin" && (
                    <Link to={`/settings/group/${name}/members`}>
                      <button type="button">{isMobile ? "멤버" : "멤버 관리"}</button>
                    </Link>
                  )}
                  {following ? (
                    <button className="unfollow" onClick={follow} type="button">
                      팔로잉
                    </button>
                  ) : (
                    <button className="follow" onClick={follow} type="button">
                      팔로우
                    </button>
                  )}
                </>
              ) : (
                <>
                  {following ? (
                    <button className="unfollow" onClick={follow} type="button">
                      팔로잉
                    </button>
                  ) : (
                    <button className="follow" onClick={follow} type="button">
                      팔로우
                    </button>
                  )}
                </>
              )}
            </section>
          </Page.Header.Left.UserInfo>
        </Page.Header.Left>
        <Page.Header.Right>
          <ProfileStats stats={stats} />
        </Page.Header.Right>
      </Page.Header>
      <Page.Body>
        <Page.Body.Group>
          <StyledQuill theme="bubble" readOnly value={description} />
        </Page.Body.Group>
      </Page.Body>
      <Zabos>
        <h1>
          업로드한 자보 <small>{zabosCount}</small>
        </h1>
        <ZaboList type="group" query={name} />
      </Zabos>
    </Page>
  );
};

GroupProfile.propTypes = {
  profile: GroupType.isRequired,
};

export default GroupProfile;
