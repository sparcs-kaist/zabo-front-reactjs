import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';

import { GroupType } from 'lib/propTypes';
import { getLabeledTimeDiff } from 'lib/utils';

import groupDefaultProfile from 'static/images/groupDefaultProfile.png';

import ProfileStats from '../ProfileStats';
import { Group } from './GroupBox.styled';

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
    <Group to={name}>
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
    </Group>
  );
};

GroupBox.propTypes = {
  group: GroupType.isRequired,
};

export default GroupBox;
