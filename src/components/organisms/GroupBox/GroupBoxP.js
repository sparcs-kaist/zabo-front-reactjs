import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';

import { GroupType } from 'lib/propTypes';
import { getLabeledTimeDiff } from 'lib/utils';

import groupDefaultProfile from 'static/images/groupDefaultProfile.png';

import {
  GroupW, NameW, ProfileStatsW, WritingsW,
} from './GroupBox.styled';

const GroupBox = ({ group, ...props }) => {
  const {
    name, profilePhoto, zabosCount, followersCount, recentUpload, isPending,
  } = group;
  const timePast = recentUpload ? getLabeledTimeDiff (recentUpload, true, true, true, true, true, true) : '없음';
  const stats = [{
    name: '올린 자보',
    value: zabosCount,
  }, {
    name: '팔로워',
    value: followersCount,
  }, {
    name: '최근 업로드',
    value: timePast,
  }];

  return (
    <GroupW
      to={name}
      isPending={isPending}
      disabled={isPending}
      onClick={e => { if (isPending) e.preventDefault (); }}
      {...props}
    >
      {
        profilePhoto
          ? <img src={profilePhoto} alt="group profile photo" />
          : <img src={groupDefaultProfile} alt="default group profile photo" />
      }
      <WritingsW>
        <Tooltip title={isPending ? '요청 진행 중' : name} enterTouchDelay={0}>
          <NameW>{name}</NameW>
        </Tooltip>
        <ProfileStatsW stats={stats} smallV />
      </WritingsW>
    </GroupW>
  );
};

GroupBox.propTypes = {
  group: GroupType.isRequired,
};

export default GroupBox;
