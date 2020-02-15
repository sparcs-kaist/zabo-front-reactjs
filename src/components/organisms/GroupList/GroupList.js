import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { GroupType } from 'lib/propTypes';

import leftScroll from 'static/images/leftScroll.png';
import rightScroll from 'static/images/rightScroll.png';

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
  scroll-behavior: smooth;
  width: 100%;
  padding: 3px;
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
`;

Groups.ScrollBtn = styled.div`
  ${props => (props.show ? css`` : css`
    visibility: hidden;
  `)}
  @media (max-width: 640px) {
    visibility: hidden;
  }
  float: right;
  img {
    width: 30px;
    height: 30px;
    margin-left: 3px;
    border-radius: 50%;
    cursor: pointer;
    &:hover {
      box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.4);
    }
  }
`;

const text = {
  profile: '소속 그룹',
  search: '그룹 검색 결과',
};

const GroupList = ({ type, groups }) => {
  const leftScrollClick = useCallback (() => {
    document.getElementById ('groupsList').scrollLeft -= 622;
  }, []);
  const rightScrollClick = useCallback (() => {
    document.getElementById ('groupsList').scrollLeft += 622;
  }, []);

  return (
    <Groups>
      <h1>{text[type]}</h1>
      <Groups.ScrollBtn show={groups.length > 3}>
        <img onClick={leftScrollClick} src={leftScroll} alt="left scroll button" />
        <img onClick={rightScrollClick} src={rightScroll} alt="right scroll button" />
      </Groups.ScrollBtn>
      <Groups.List id="groupsList">
        {groups.map (group => <GroupBox group={group} key={group.name} />)}
      </Groups.List>
    </Groups>
  );
};

GroupList.propTypes = {
  type: PropTypes.string.isRequired,
  groups: PropTypes.arrayOf (GroupType).isRequired,
};

export default GroupList;
