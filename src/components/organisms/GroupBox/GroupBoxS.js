import React, { useEffect, useRef, useState } from 'react';
import Tooltip from '@material-ui/core/Tooltip';

import { GroupType } from 'lib/propTypes';
import { isElementOverflown } from 'lib/utils';

import groupDefaultProfile from 'static/images/groupDefaultProfile.png';

import { GroupW, NameW, WritingsW } from './GroupBox.styled';

const GroupBoxS = ({ group }) => {
  const {
    name, profilePhoto,
  } = group;

  const nameRef = useRef (null);
  const [showTooltip, setShowTooltip] = useState (false);
  useEffect (() => { setShowTooltip (isElementOverflown (nameRef.current)); }, [nameRef]);

  return (
    <GroupW to={name}>
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
      </WritingsW>
    </GroupW>
  );
};

GroupBoxS.propTypes = {
  group: GroupType.isRequired,
};

export default GroupBoxS;
