import React from "react";
import Tooltip from "@material-ui/core/Tooltip";

import { getLabeledTimeDiff } from "lib/utils";

import groupDefaultProfile from "static/images/groupDefaultProfile.png";

import { GroupW, NameW, ProfileStatsW, WritingsW } from "./GroupBox.styled";
import type { Group } from "lib/interface";

interface Props {
  group: Group;
}

const GroupBox: React.FC<Props> = ({ group, ...props }) => {
  const timePast = group.recentUpload
    ? getLabeledTimeDiff(group.recentUpload, 60, 60, 24, 7, 5, 12)
    : "없음";
  const stats = [
    {
      name: "올린 자보",
      value: group.zabosCount,
    },
    {
      name: "팔로워",
      value: group.followersCount,
    },
    {
      name: "최근 업로드",
      value: timePast,
    },
  ];

  return (
    <GroupW
      to={group.name}
      isPending={group.isPending}
      aria-disabled={group.isPending}
      onClick={(e) => {
        if (group.isPending) e.preventDefault();
      }}
      {...props}
    >
      {group.profilePhoto ? (
        <img src={group.profilePhoto} alt="group profile photo" />
      ) : (
        <img src={groupDefaultProfile} alt="default group profile photo" />
      )}
      <WritingsW>
        <Tooltip title={group.isPending ? "요청 진행 중" : group.name} enterTouchDelay={0}>
          <NameW>{group.name}</NameW>
        </Tooltip>
        <ProfileStatsW stats={stats} smallV />
      </WritingsW>
    </GroupW>
  );
};

export default GroupBox;
