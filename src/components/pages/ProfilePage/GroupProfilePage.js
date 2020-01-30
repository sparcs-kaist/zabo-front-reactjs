import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SettingsIcon from '@material-ui/icons/Settings';

import { Page, Group, Zabos } from './Profile.styled';
import Header from '../../templates/Header';
import ZaboList from '../../templates/ZaboList';
import ProfileStats from '../../organisms/ProfileStats';

import { GroupType } from '../../../lib/propTypes';

import groupDefaultProfile from '../../../static/images/groupDefaultProfile.png';
import { setCurrentGroup } from '../../../store/reducers/auth';
import { getLabeledTimeDiff } from '../../../lib/utils';

const GroupProfile = ({ profile }) => {
  const {
    name, profilePhoto, members, zabosCount, followersCount, recentUpload, description,
  } = profile;
  const dispatch = useDispatch ();
  const myUserId = useSelector (state => state.getIn (['auth', 'info', '_id']));
  const isMyGroupProfile = !!members.find (obj => obj.user === myUserId);
  const toUpload = useCallback (() => {
    dispatch (setCurrentGroup (name));
  }, [name]);

  const timePast = recentUpload ? getLabeledTimeDiff (recentUpload) : '없음';
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

  const rightGroup = isMyGroupProfile
    ? <Link to="/settings/profile"><SettingsIcon /></Link>
    : <Header.AuthButton />;

  // TODO: need to add ZaboList type with groupUpload Zabolists
  // TODO: add short, long description <- need to implement server (change schema)

  return (
    <Page>
      <Header rightGroup={rightGroup} scrollHeader />
      <Page.Header>
        <Page.Header.Left>
          <Page.Header.Left.ProfilePhoto>
            {
              profilePhoto
                ? <img src={profilePhoto} alt="profile photo" />
                : <img src={groupDefaultProfile} alt="default profile img" />
            }
          </Page.Header.Left.ProfilePhoto>
          <Page.Header.Left.UserInfo>
            <h1>{name}</h1>
            <p>{description || '아직 소개가 없습니다.'}</p>
            {
              isMyGroupProfile
                ? (
                  <section>
                    <Link to={`/settings/group/${name}`}>
                      <button className="edit" type="button">프로필 편집</button>
                    </Link>
                    <Link to="/zabo/upload">
                      <button onClick={toUpload} type="button">업로드</button>
                    </Link>
                  </section>
                ) : (
                  ''
                )
            }
          </Page.Header.Left.UserInfo>
        </Page.Header.Left>
        <Page.Header.Right>
          <ProfileStats stats={stats} />
        </Page.Header.Right>
      </Page.Header>
      <Zabos>
        <h1>업로드한 자보</h1>
      </Zabos>
    </Page>
  );
};

GroupProfile.propTypes = {
  profile: PropTypes.shape (GroupType).isRequired,
};

export default GroupProfile;
