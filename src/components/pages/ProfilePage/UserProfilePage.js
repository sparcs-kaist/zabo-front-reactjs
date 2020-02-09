import React, {
  useEffect, useRef, useState,
} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import SettingsIcon from '@material-ui/icons/Settings';

import { UserType } from '../../../lib/propTypes';
import {
  Page, Zabos,
} from './Profile.styled';
import Header from '../../templates/Header';
import ZaboList from '../../templates/ZaboList';
import ProfileStats from '../../organisms/ProfileStats';
import Button from '../../atoms/Button';
import GroupList from '../../organisms/GroupList';

import defaultProfile from '../../../static/images/defaultProfile.png';
import { logout as logoutAction } from '../../../store/reducers/auth';
import { isAdminSelector, isElementOverflown } from '../../../lib/utils';

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
      <GroupList type="profile" groups={groups} />
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
