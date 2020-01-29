import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import SettingsIcon from '@material-ui/icons/Settings';

import { UserType, GroupType } from '../../../lib/propTypes';
import {
  Page, Groups, Stats, Zabos,
} from './Profile.styled';
import Header from '../../templates/Header';
import ZaboList from '../../templates/ZaboList';

import defaultProfile from '../../../static/images/defaultProfile.png';
import groupDefaultProfile from '../../../static/images/groupDefaultProfile.png';
import leftScroll from '../../../static/images/leftScroll.png';
import rightScroll from '../../../static/images/rightScroll.png';

import { logout as logoutAction } from '../../../store/reducers/auth';

const ProfileStats = ({ stats, smallV }) => (
  <Stats>
    {
        stats.map (({ name, value }) => (
          <Stats.elem key={name} small={smallV}>
            <h3>{value}</h3>
            <div>{name}</div>
          </Stats.elem>
        ))
      }
  </Stats>
);

ProfileStats.propTypes = {
  stats: PropTypes.arrayOf (PropTypes.shape ({
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType ([PropTypes.number, PropTypes.string]).isRequired,
  })).isRequired,
  smallV: PropTypes.bool,
};

ProfileStats.defaultProps = {
  smallV: false,
};

const GroupBox = ({ group }) => {
  const { name, profilePhoto, stats: { zaboCount = 263, followerCount = 194, recentUploadDate = 23 } } = group;
  const stats = [{
    name: '자보',
    value: zaboCount,
  }, {
    name: '팔로워',
    value: followerCount,
  }, {
    name: '최근 업로드',
    value: recentUploadDate,
  }];

  return (
    <Groups.ListItem>
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
    username, profilePhoto, groups, description, stats: { likesCount, pinsCount, followsCount },
  } = profile;
  const dispatch = useDispatch ();
  const myUsername = useSelector (state => state.getIn (['auth', 'info', 'username']));
  const isMyProfile = (myUsername === username);
  const logout = () => dispatch (logoutAction ());

  const stats = [{
    name: '저장한 자보',
    pinsCount,
  }, {
    name: '좋아하는 자보',
    likesCount,
  }, {
    name: '팔로잉',
    followsCount,
  }];

  const rightGroup = isMyProfile
    ? <Link to="/settings/profile"><SettingsIcon /></Link>
    : <Header.AuthButton />;

  // TODO : need to change scroll value; consider mobile app version
  const leftScrollClick = useCallback (() => {
    document.getElementById ('groupsList').scrollLeft -= 1000;
  }, []);
  const rightScrollClick = useCallback (() => {
    document.getElementById ('groupsList').scrollLeft += 1000;
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
            <p>{description || '아직 소개가 없습니다.'}</p>
            <section>
              {isMyProfile && <button className="logout" type="button" onClick={logout}>로그아웃</button>}
              {isMyProfile && (
                <Link to="/settings/profile">
                  <button className="edit" type="button">프로필 편집</button>
                </Link>
              )}
            </section>
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
          {groups.map (group => (
            <Link to={group.name} key={group.name}>
              <GroupBox group={group} />
            </Link>
          ))}
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
