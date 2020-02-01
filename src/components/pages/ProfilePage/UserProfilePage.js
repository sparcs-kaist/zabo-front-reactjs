import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import SettingsIcon from '@material-ui/icons/Settings';

import { UserType, GroupType } from '../../../lib/propTypes';
import {
  Page, Groups, Zabos,
} from './Profile.styled';
import Header from '../../templates/Header';
import ZaboList from '../../templates/ZaboList';
import ProfileStats from '../../organisms/ProfileStats';

import defaultProfile from '../../../static/images/defaultProfile.png';
import groupDefaultProfile from '../../../static/images/groupDefaultProfile.png';
import leftScroll from '../../../static/images/leftScroll.png';
import rightScroll from '../../../static/images/rightScroll.png';

import { logout as logoutAction } from '../../../store/reducers/auth';
import { getLabeledTimeDiff, isAdminSelector } from '../../../lib/utils';

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
  group: PropTypes.shape (GroupType).isRequired,
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
            <Tooltip title={description}>
              <p>{description || '아직 소개가 없습니다.'}</p>
            </Tooltip>
            {isMyProfile && (
            <section>
              <button className="logout" type="button" onClick={logout}>로그아웃</button>
              <Link to="/settings/profile">
                <button className="edit" type="button">프로필 편집</button>
              </Link>
              {isAdmin && (<Link to="/admin"><button className="admin" type="button">어드민</button></Link>)}
            </section>
            )}
          </Page.Header.Left.UserInfo>
        </Page.Header.Left>
        <Page.Header.Right>
          <ProfileStats stats={stats} />
        </Page.Header.Right>
      </Page.Header>
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
        <ZaboList type="pins" />
      </Zabos>
    </Page>
  );
};

UserProfile.propTypes = {
  profile: PropTypes.shape (UserType).isRequired,
};

export default UserProfile;
