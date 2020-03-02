import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import SuperTooltip from 'atoms/SuperTooltip';

import { GroupType } from 'lib/propTypes';
import { isElemWidthOverflown } from 'lib/utils';

import groupDefaultProfile from 'static/images/groupDefaultProfile.png';

import {
  GroupSW, NameW, SubtitleW, WritingsW,
} from './GroupBox.styled';

const GroupBoxS = ({ group, ...props }) => {
  const {
    name, profilePhoto, subtitle,
  } = group;
  const width = useSelector (state => state.getIn (['app', 'windowSize', 'width']));
  const nameRef = useRef (null);
  const [showTooltip, setShowTooltip] = useState (false);
  useEffect (() => { setShowTooltip (isElemWidthOverflown (nameRef.current)); }, [nameRef, width]);

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
        <SuperTooltip title={name} hide={!showTooltip}>
          <NameW ref={nameRef}>{name}</NameW>
        </SuperTooltip>
        <SubtitleW>{subtitle || '한 줄 소개 없음'}</SubtitleW>
      </WritingsW>
    </GroupSW>
  );
};

GroupBoxS.propTypes = {
  group: GroupType.isRequired,
};

export default GroupBoxS;
