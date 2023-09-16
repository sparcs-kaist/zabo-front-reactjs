import React from "react";

import addGray from "static/images/add_gray.svg";

import { GroupAW } from "./GroupBox.styled";

const GroupBox: React.FC = () => (
  <GroupAW to="/settings/group/apply">
    <img src={addGray} alt="add icon" />
    <p>새로운 그룹 신청하기</p>
  </GroupAW>
);

export default GroupBox;
