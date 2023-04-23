import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import get from "lodash.get";

import SuperTooltip from "components/atoms/SuperTooltip";

import { isElemWidthOverflown } from "lib/utils";

import groupDefaultProfile from "static/images/groupDefaultProfile.png";

import { GroupSW, NameW, SubtitleW, WritingsW } from "./GroupBox.styled";
import { Group } from "lib/interface";

interface Props {
  group: Group;
}

const GroupBoxS: React.FC<Props> = ({ group, ...props }) => {
  const width = useSelector((state) => get(state, ["app", "windowSize", "width"]));
  const nameRef = useRef<HTMLDivElement>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  useEffect(() => {
    nameRef.current && setShowTooltip(isElemWidthOverflown(nameRef.current));
  }, [nameRef, width]);

  return (
    <GroupSW to={group.name} {...props}>
      <div>
        {group.profilePhoto ? (
          <img src={group.profilePhoto} alt="group profile" />
        ) : (
          <img src={groupDefaultProfile} alt="default group profile" />
        )}
      </div>
      <WritingsW>
        <SuperTooltip title={group.name} hide={!showTooltip}>
          <NameW ref={nameRef}>{group.name}</NameW>
        </SuperTooltip>
        <SubtitleW>{group.subtitle || "한 줄 소개 없음"}</SubtitleW>
      </WritingsW>
    </GroupSW>
  );
};

export default GroupBoxS;
