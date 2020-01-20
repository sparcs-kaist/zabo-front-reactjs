import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import SettingsIcon from '@material-ui/icons/Settings';
import { UserType } from '../../../lib/propTypes';
import { Page, Groups, Stats } from './Profile.styled';
import Header from '../../templates/Header';

import defaultProfile from '../../../static/images/defaultProfile.png';
import groupDefaultProfile from '../../../static/images/groupDefaultProfile.png';
import leftScroll from '../../../static/images/leftScroll.png';
import rightScroll from '../../../static/images/rightScroll.png';

import { logout as logoutAction } from '../../../store/reducers/auth';

const ProfileStats = ({ statsNames, statsNums, smallV }) => {
  const cName = smallV ? 'mini' : '';
  return (
    <Stats>
      {
        statsNums.map ((elem, idx) => (
          <Stats.elem key={idx} className={cName}>
            <h3>{elem}</h3>
            <div>{statsNames[idx]}</div>
          </Stats.elem>
        ))
      }
    </Stats>
  );
};

const GroupBox = ({ group }) => {
  const statsNames = ['자보', '팔로워', '최근 업로드'];
  const statsNums = [263, 263, 23];

  return (
    <Groups.ListItem>
      {
        group.profilePhoto
          ? <img src={group.profilePhoto} alt="group profile photo" />
          : <img src={groupDefaultProfile} alt="default group profile photo" />
      }
      <section>
        <Tooltip title={group.name}>
          <div className="group-name">{group.name}</div>
        </Tooltip>
        <ProfileStats statsNames={statsNames} statsNums={statsNums} smallV />
      </section>
    </Groups.ListItem>
  );
};

const UserProfile = ({ profile }) => {
  const {
    username, profilePhoto, backgroundPhoto, groups, description,
  } = profile;
  const dispatch = useDispatch ();
  const myUsername = useSelector (state => state.getIn (['auth', 'info', 'username']));
  const isMyProfile = (myUsername === username);
  const logout = () => dispatch (logoutAction ());

  const statsNames = ['저장한 자보', '좋아하는 자보', '팔로잉'];
  const statsNums = [100, 123, 100];

  const rightGroup = isMyProfile
    ? <Link to="/settings/profile"><SettingsIcon /></Link>
    : <Header.AuthButton />;

  const leftScrollClick = () => {
    document.getElementById ('groupsList').scrollLeft -= 1000;
  };
  const rightScrollClick = () => {
    document.getElementById ('groupsList').scrollLeft += 1000;
  };

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
              {/* <div className="button logout">로그아웃</div> */}
              {isMyProfile && <button className="logout" type="button" onClick={logout}>로그아웃</button>}
              {isMyProfile && <button className="edit" type="button" onClick={logout}>프로필 편집</button>}
              {/* <div className="button edit">프로필 편집</div> */}
            </section>
          </Page.Header.Left.UserInfo>
        </Page.Header.Left>
        <Page.Header.Right>
          <ProfileStats statsNames={statsNames} statsNums={statsNums} />
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
    </Page>
  );
};

UserProfile.propTypes = {
  profile: PropTypes.shape (UserType).isRequired,
};

export default UserProfile;
