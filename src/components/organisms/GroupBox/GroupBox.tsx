import React from "react";

import GroupBoxA from "./GroupBoxA";
import GroupBoxP from "./GroupBoxP";
import GroupBoxS from "./GroupBoxS";
import type { Group } from "lib/interface";

interface Props {
  type?: "profile" | "simple" | "apply";
  group?: Group;
}

const GroupBox: React.FC<Props> = ({ type = "profile", group = null, ...props }) => {
  switch (type) {
    case "profile":
      return group && <GroupBoxP group={group} {...props} />;
    case "simple":
      return group && <GroupBoxS group={group} {...props} />;
    case "apply":
      return <GroupBoxA {...props} />;
    default:
      return null;
  }
};

export default GroupBox;
