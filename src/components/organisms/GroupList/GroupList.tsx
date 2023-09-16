import React from "react";
import styled from "styled-components";

import ScrollBtn from "../../molecules/ScrollBtn";
import GroupBox from "../GroupBox";
import type { Group } from "lib/interface/schemas";

const GroupsComponent = styled.section`
  width: 1032px;

  h1 {
    display: inline-block;
    font-size: 22px;
    color: #363636;
    margin: 0 0 16px;
    font-weight: 800;
  }

  @media (max-width: 640px) {
    width: 100%;
    /* padding: 0 16px; */
    h1 {
      padding: 0 16px;
      font-size: 18px;
      margin-bottom: 12px;
    }
  }
`;

const GroupsListComponent = styled.div`
  display: flex;
  scroll-behavior: smooth;
  width: 100%;
  padding: 3px;
  margin-top: 16px;
  overflow-x: scroll;
  /* overflow-y: visible; */
  white-space: nowrap;

  /* hide scroll bar */
  /* -webkit- (Chrome, Safari, newer versions of Opera) */

  &::-webkit-scrollbar {
    width: 0 !important;
  }

  /* Firefox */
  scrollbar-width: none;
  /* -ms- (Internet Explorer +10) */
  -ms-overflow-style: none;
  @media (max-width: 640px) {
    margin-top: 12px;
    padding: 3px 16px;
  }
`;

export const Groups = Object.assign(GroupsComponent, { List: GroupsListComponent });

const text = {
  profile: "소속 그룹",
  search: "그룹 검색 결과",
} as const;

interface Props {
  type: keyof typeof text;
  groups: Group[];
  hasApplyBox?: boolean;
  isMyProfile?: boolean;
}

const GroupList: React.FC<Props> = ({ type, groups, isMyProfile }) => (
  <Groups>
    <h1>{text[type]}</h1>
    <ScrollBtn elemId="groupsList" show={groups.length > 3} />
    <Groups.List id="groupsList">
      {groups.map((group) => (
        <GroupBox group={group} key={group.name} />
      ))}
      {isMyProfile && <GroupBox type="apply" />}
      <>&nbsp;</>
    </Groups.List>
  </Groups>
);

export default GroupList;
