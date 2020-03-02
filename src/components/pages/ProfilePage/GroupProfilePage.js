import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import SettingsIcon from '@material-ui/icons/Settings';

import ProfileStats from 'organisms/ProfileStats';
import StyledQuill from 'organisms/StyledQuill';
import Header from 'templates/Header';
import ZaboList from 'templates/ZaboList';

import { followProfile } from 'store/reducers/profile';
import { GroupType } from 'lib/propTypes';
import { getLabeledTimeDiff, isElementOverflown } from 'lib/utils';

import groupDefaultProfile from 'static/images/groupDefaultProfile.png';

import { Page, Zabos } from './Profile.styled';

const GroupProfile = ({ profile }) => {
  const {
    name, profilePhoto, members, zabosCount, followersCount, recentUpload, description = '', subtitle = '', myRole, following,
  } = profile;
  const dispatch = useDispatch ();
  const descRef = useRef (null);
  const [showTooltip, setShowTooltip] = useState (false);
  const follow = useCallback (() => {
    dispatch (followProfile ({ name }));
  }, [name]);
  useEffect (() => { setShowTooltip (isElementOverflown (descRef.current)); }, [descRef]);

  const timePast = recentUpload ? getLabeledTimeDiff (recentUpload, true, true, true, true, true, true) : '없음';
  const stats = [{
    name: '올린 자보',
    value: zabosCount,
  }, {
    name: '팔로워',
    value: followersCount,
  }, {
    name: '최근 활동',
    value: timePast,
  }];

  return (
    <Page>
      <Header type="upload" groupName={name} scrollHeader />
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
            {
              showTooltip
                ? (
                  <Tooltip title={subtitle}>
                    <p ref={descRef}>{subtitle || '아직 소개가 없습니다.'}</p>
                  </Tooltip>
                )
                : <p ref={descRef}>{subtitle || '아직 소개가 없습니다.'}</p>
            }

            <section>
              {
                myRole
                  ? (
                    <>
                      <Link to={`/settings/group/${name}/profile`}>
                        <button className="edit-web" type="button">프로필 편집</button>
                        <button className="edit-mobile" type="button">편집</button>
                      </Link>
                      {myRole === 'admin' && (
                        <Link to={`/settings/group/${name}/members`}>
                          <button className="edit-web" type="button">멤버 관리</button>
                          <button className="edit-mobile" type="button">멤버</button>
                        </Link>
                      )}
                      {following
                        ? <button className="unfollow" onClick={follow} type="button">팔로잉</button>
                        : <button className="follow" onClick={follow} type="button">팔로우</button>}
                    </>
                  )
                  : (
                    <>
                      {following
                        ? <button onClick={follow} type="button">팔로잉</button>
                        : <button onClick={follow} type="button">팔로우</button>}
                    </>
                  )
              }
            </section>
          </Page.Header.Left.UserInfo>
        </Page.Header.Left>
        <Page.Header.Right>
          <ProfileStats stats={stats} />
        </Page.Header.Right>
      </Page.Header>
      <Page.Body>
        <Page.Body.Group>
          <StyledQuill
            theme="bubble"
            readOnly
            value={description}
          />
        </Page.Body.Group>
      </Page.Body>
      <Zabos>
        <h1>업로드한 자보 <small>{zabosCount}</small></h1>
        <ZaboList type="group" query={name} />
      </Zabos>
    </Page>
  );
};

GroupProfile.propTypes = {
  profile: GroupType.isRequired,
};

export default GroupProfile;
