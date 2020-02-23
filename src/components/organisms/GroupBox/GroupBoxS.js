import React from 'react';

import { GroupType } from 'lib/propTypes';

import groupDefaultProfile from 'static/images/groupDefaultProfile.png';

import { Group } from './GroupBox.styled';

const GroupBoxS = ({ group }) => {
  const {
    name, profilePhoto,
  } = group;

  return (
    <Group to={name}>
      {
        profilePhoto
          ? <img src={profilePhoto} alt="group profile" />
          : <img src={groupDefaultProfile} alt="default group profile" />
      }
    </Group>
  );
};

GroupBoxS.propTypes = {
  group: GroupType.isRequired,
};

export default GroupBoxS;
