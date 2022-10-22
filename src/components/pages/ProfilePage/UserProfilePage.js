import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import get from "lodash.get";

import Button from "components/atoms/Button";
import SuperTooltip from "components/atoms/SuperTooltip";
import GroupList from "components/organisms/GroupList";
import ProfileStats from "components/organisms/ProfileStats";
import Header from "components/templates/Header";
import ZaboList from "components/templates/ZaboList";

import { logout as logoutAction } from "store/reducers/auth";
import { UserType } from "lib/propTypes";
import { isAdminSelector, isElemWidthOverflown } from "lib/utils";
import { mediaSizes } from "lib/utils/style";

import defaultProfile from "static/images/defaultProfile.png";

import { Page, Zabos } from "./Profile.styled";

const UserProfile = ({ profile }) => {
  const {
    username,
    profilePhoto,
    groups,
    description,
    boards,
    stats: { likesCount, followingsCount } = {},
    following,
  } = profile;
  const width = useSelector((state) => get(state, ["app", "windowSize", "width"]));
  const dispatch = useDispatch();
  const myUsername = useSelector((state) => get(state, ["auth", "info", "username"]));
  const pendingGroups = useSelector((state) => get(state, ["auth", "info", "pendingGroups"]));
  const isMyProfile = myUsername === username;
  const isAdmin = useSelector(isAdminSelector);
  const logout = () => dispatch(logoutAction());
  const descRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);
  useEffect(() => {
    setShowTooltip(isElemWidthOverflown(descRef.current));
  }, [descRef, width]);
  const isMobile = useMemo(() => mediaSizes.tablet > width, [width]);

  const pinsCount = boards.reduce((acc, cur) => acc + cur.pinsCount, 0);
  const stats = [
    {
      name: "저장한 자보",
      value: pinsCount,
    },
    {
      name: "좋아하는 자보",
      value: likesCount,
    },
    {
      name: "팔로잉",
      value: followingsCount,
    },
  ];

  const groupsWithPending = useMemo(
    () => [...groups, ...pendingGroups.map((group) => ({ ...group, isPending: true }))],
    [groups, pendingGroups],
  );

  return (
    <Page>
      <Header type="upload" scrollHeader />
      <Page.Header>
        <Page.Header.Left>
          <Page.Header.Left.ProfilePhoto>
            {profilePhoto ? (
              <img src={profilePhoto} alt="profile photo" />
            ) : (
              <img src={defaultProfile} alt="default profile img" />
            )}
          </Page.Header.Left.ProfilePhoto>
          <Page.Header.Left.UserInfo>
            <h1>{username}</h1>
            <SuperTooltip title={description} hide={!showTooltip}>
              <p ref={descRef}>{description || "아직 소개가 없습니다."}</p>
            </SuperTooltip>
            {isMyProfile ? (
              <section>
                <Button.Group>
                  <Button onClick={logout}>로그아웃</Button>
                  <Button to="/settings/profile" border="main">
                    {isMobile ? "편집" : "프로필 편집"}
                  </Button>
                  {isAdmin && <Button to="/admin">{isMobile ? "관리" : "관리자"}</Button>}
                </Button.Group>
              </section>
            ) : (
              // <sectino>
              //   {following
              //     ? <button onClick={follow} type="button">팔로우 취소</button>
              //     : <button onClick={follow} type="button">팔로우</button>}
              // </sectino>
              ""
            )}
          </Page.Header.Left.UserInfo>
        </Page.Header.Left>
        <Page.Header.Right>
          <ProfileStats stats={stats} />
        </Page.Header.Right>
      </Page.Header>
      <Page.Body>
        <Page.Body.User></Page.Body.User>
      </Page.Body>
      <GroupList type="profile" groups={groupsWithPending} hasApplyBox isMyProfile={isMyProfile} />
      <Zabos>
        <h1>저장한 자보</h1>
        <ZaboList type="pins" query={username} key={username} />
      </Zabos>
    </Page>
  );
};

UserProfile.propTypes = {
  profile: UserType.isRequired,
};

export default UserProfile;
