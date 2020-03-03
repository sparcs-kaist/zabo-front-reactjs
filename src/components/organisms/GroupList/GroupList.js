import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { GroupType } from 'lib/propTypes';

import ScrollBtn from '../../molecules/ScrollBtn';
import GroupBox from '../GroupBox';

export const Groups = styled.section`
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
    padding: 0 16px;
    h1 {
      font-size: 18px;
      margin-bottom: 12px;
    }
  }
`;

Groups.List = styled.div`
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
  &::-webkit-scrollbar { width: 0 !important }
  /* Firefox */
  scrollbar-width: none;
  /* -ms- (Internet Explorer +10) */
  -ms-overflow-style: none;
  @media (max-width: 640px) { margin-top: 12px }
`;

const text = {
  profile: '소속 그룹',
  search: '그룹 검색 결과',
};

const GroupList = ({
  type, groups, hasApplyBox, isMyProfile,
}) => (
  <Groups>
    <h1>{text[type]}</h1>
    <ScrollBtn elemId="groupsList" show={groups.length > 3} />
    <Groups.List id="groupsList">
      {groups.map (group => <GroupBox group={group} key={group.name} />)}
      {isMyProfile && <GroupBox type="apply" group={{}} />}
      <>&nbsp;</>
    </Groups.List>
  </Groups>
);

GroupList.propTypes = {
  type: PropTypes.string.isRequired,
  groups: PropTypes.arrayOf (GroupType).isRequired,
  hasApplyBox: PropTypes.bool,
};

GroupList.defaultProps = {
  hasApplyBox: false,
};

export default GroupList;
