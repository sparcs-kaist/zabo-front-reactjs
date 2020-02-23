import React, { useEffect, useRef, useState } from 'react';
import Tooltip from '@material-ui/core/Tooltip';

import { GroupType } from 'lib/propTypes';
import { isElementOverflown } from 'lib/utils';

import groupDefaultProfile from 'static/images/groupDefaultProfile.png';

import {
  GroupSW, NameW, SubtitleW, WritingsW,
} from './GroupBox.styled';

const GroupBoxS = ({ group, ...props }) => {
  const {
    name, profilePhoto, subtitle,
  } = group;

  const nameRef = useRef (null);
  const [showTooltip, setShowTooltip] = useState (false);
  useEffect (() => { setShowTooltip (isElementOverflown (nameRef.current)); }, [nameRef]);

  return (
    <GroupSW to={name} {...props}>
      <div>
        {
          profilePhoto
            ? <img src={profilePhoto} alt="group profile" />
            : <img src={groupDefaultProfile} alt="default group profile" />
        }
      </div>
      <WritingsW>
        {
          showTooltip ? (
            <Tooltip title={name}>
              <NameW ref={nameRef}>{name}</NameW>
            </Tooltip>
          ) : <NameW ref={nameRef}>{name}</NameW>
        }
        <SubtitleW>{subtitle || '한 줄 소개 없음'}</SubtitleW>
      </WritingsW>
    </GroupSW>
  );
};

GroupBoxS.propTypes = {
  group: GroupType.isRequired,
};

export default GroupBoxS;
