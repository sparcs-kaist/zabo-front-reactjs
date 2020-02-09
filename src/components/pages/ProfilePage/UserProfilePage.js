import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import SettingsIcon from '@material-ui/icons/Settings';

import Button from 'atoms/Button';
import ProfileStats from 'organisms/ProfileStats';
import Header from 'templates/Header';
import ZaboList from 'templates/ZaboList';

import { logout as logoutAction } from 'store/reducers/auth';
import { GroupType, UserType } from 'lib/propTypes';
import { getLabeledTimeDiff, isAdminSelector, isElementOverflown } from 'lib/utils';

import defaultProfile from 'static/images/defaultProfile.png';
import groupDefaultProfile from 'static/images/groupDefaultProfile.png';
import leftScroll from 'static/images/leftScroll.png';
import rightScroll from 'static/images/rightScroll.png';

import {
  Groups, Page, Zabos,
} from './Profile.styled';

const GroupBox = ({ group }) => {
  const {
    name, profilePhoto, zabosCount, followersCount, recentUpload,
  } = group;
  const timePast = recentUpload ? getLabeledTimeDiff (recentUpload, true, true, true, true, true, true) : '없음';
  const stats = [{
    name: '자보',
    value: zabosCount,
  }, {
    name: '팔로워',
    value: followersCount,
  }, {
    name: '최근 업로드',
    value: timePast,
  }];

  return (
    <Groups.ListItem to={name}>
      {
        profilePhoto
          ? <img src={profilePhoto} alt="group profile photo" />
          : <img src={groupDefaultProfile} alt="default group profile photo" />
      }
      <section>
        <Tooltip title={name}>
          <div className="group-name">{name}</div>
        </Tooltip>
        <ProfileStats stats={stats} smallV />
      </section>
    </Groups.ListItem>
  );
};

GroupBox.propTypes = {
  group: GroupType.isRequired,
};


const UserProfile = ({ profile }) => {
  const {
    username, profilePhoto, groups, description, boards, stats: { likesCount, followingsCount } = {},
  } = profile;
  const dispatch = useDispatch ();
  const myUsername = useSelector (state => state.getIn (['auth', 'info', 'username']));
  const isMyProfile = (myUsername === username);
  const isAdmin = useSelector (isAdminSelector);
  const logout = () => dispatch (logoutAction ());
  const descRef = useRef (null);
  const [showTooltip, setShowTooltip] = useState (false);
  useEffect (() => { setShowTooltip (isElementOverflown (descRef.current)); }, [descRef]);

  const pinsCount = boards.reduce ((acc, cur) => acc + cur.pinsCount, 0);
  const stats = [{
    name: '저장한 자보',
    value: pinsCount,
  }, {
    name: '좋아하는 자보',
    value: likesCount,
  }, {
    name: '팔로잉',
    value: followingsCount,
  }];

  const rightGroup = isMyProfile
    ? <Link to="/settings/profile"><SettingsIcon /></Link>
    : <Header.AuthButton />;

  // TODO : need to change scroll value; consider mobile app version
  const leftScrollClick = useCallback (() => {
    document.getElementById ('groupsList').scrollLeft -= 622;
  }, []);
  const rightScrollClick = useCallback (() => {
    document.getElementById ('groupsList').scrollLeft += 622;
  }, []);

  return (
    <Page>
      <Header rightGroup={rightGroup} scrollHeader />
      <Page.Header>
        <Page.Header.Left>
          <Page.Header.Left.ProfilePhoto>
            {
              profilePhoto
                ? <img src={profilePhoto} alt="profile photo" />
                : <img src={defaultProfile} alt="default profile img" />
            }
          </Page.Header.Left.ProfilePhoto>
          <Page.Header.Left.UserInfo>
            <h1>{username}</h1>
            {
              showTooltip
                ? (
                  <Tooltip title={description}>
                    <p ref={descRef}>{description || '아직 소개가 없습니다.'}</p>
                  </Tooltip>
                )
                : <p ref={descRef}>{description || '아직 소개가 없습니다.'}</p>
            }
            {isMyProfile && (
            <section>
              <Button.Group>
                <Button onClick={logout}>로그아웃</Button>
                <Button to="/settings/profile" border="main">프로필 편집</Button>
                {isAdmin && (<Button to="/admin">어드민</Button>)}
              </Button.Group>
            </section>
            )}
          </Page.Header.Left.UserInfo>
        </Page.Header.Left>
        <Page.Header.Right>
          <ProfileStats stats={stats} />
        </Page.Header.Right>
      </Page.Header>
      <Page.Body>
        <Page.Body.User>
        </Page.Body.User>
      </Page.Body>
      <Groups>
        <h1>소속 그룹</h1>
        <Groups.ScrollBtn>
          <img onClick={leftScrollClick} src={leftScroll} alt="left scroll button" />
          <img onClick={rightScrollClick} src={rightScroll} alt="right scroll button" />
        </Groups.ScrollBtn>
        <Groups.List id="groupsList">
          {groups.map (group => <GroupBox group={group} key={group.name} />)}
        </Groups.List>
      </Groups>
      <Zabos>
        <h1>저장한 자보</h1>
        <p>전체 자보</p>
        <ZaboList type="pins" query={username} key={username} />
      </Zabos>
    </Page>
  );
};

UserProfile.propTypes = {
  profile: UserType.isRequired,
};

export default UserProfile;
