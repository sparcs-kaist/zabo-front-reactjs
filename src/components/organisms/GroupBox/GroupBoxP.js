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
    <GroupW to={name} {...props}>
      {
        profilePhoto
          ? <img src={profilePhoto} alt="group profile photo" />
          : <img src={groupDefaultProfile} alt="default group profile photo" />
      }
      <WritingsW>
        <Tooltip title={name}>
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
