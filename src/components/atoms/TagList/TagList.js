import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import { ZABO_CATEGORIES } from "lib/variables";

export const TagListWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;

  button {
    font-size: 16px;
    line-height: 16px;
    padding: 10px 14px;
    margin: 0 12px 10px 0;
    border: 1px solid #143441;
    border-radius: 4px;
    &:hover,
    &:focus,
    &.clicked {
      color: white;
      background-color: #143441;
    }
    &.unclicked {
      color: #143441;
      background-color: white;
    }
  }
  ${(props) =>
    props.type === "search"
      ? css`
          width: 100%;
          scroll-behavior: smooth;
          overflow-x: scroll;
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

          button {
            font-size: 14px;
            padding: 8px 10px;
            margin-right: 8px;
            &:last-child {
              margin-right: 0;
            }
          }
        `
      : css``}
`;

const TagList = ({ type, onTagClick, clickedTags }) => {
  const handleClick = (e) => {
    const { value: category } = e.target;
    onTagClick(category);
  };

  const tagList = useMemo(
    () =>
      ZABO_CATEGORIES.map((tag, idx) => {
        const cName = clickedTags.includes(tag) ? "clicked" : "unclicked";
        return (
          <button key={idx} value={tag} onClick={handleClick} className={cName}>
            #{tag}
          </button>
        );
      }),
    [clickedTags, onTagClick],
  );

  return <TagListWrapper type={type}>{tagList}</TagListWrapper>;
};

TagList.propTypes = {
  type: PropTypes.string,
  onTagClick: PropTypes.func.isRequired,
  clickedTags: PropTypes.arrayOf(PropTypes.string),
};

TagList.defaultProps = {
  type: "",
  clickedTags: [],
};

export default TagList;
