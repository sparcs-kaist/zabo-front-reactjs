import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { CATEGORIES } from 'lib/variables';

const TagListWrapper = styled.div`
  margin-top: 20px;

  button {
    font-size: 16px;
    line-height: 16px;
    padding: 10px 14px;
    margin: 0 12px 10px 0;
    border: 1px solid #143441;
    border-radius: 4px;
    &:hover, &:focus, &.clicked {
      color: white;
      background-color: #143441;
    }
    &.unclicked {
      color: #143441;
      background-color: white;
    }
  }
`;

const TagList = ({ onTagClick, clickedTags }) => {
  const tagList = useMemo (() => (
    CATEGORIES.map ((tag, idx) => {
      const value = tag.slice (1);
      const cName = clickedTags.includes (value) ? 'clicked' : 'unclicked';
      return (
        <button
          key={idx}
          value={value}
          onClick={onTagClick}
          className={cName}
        >
          {tag}
        </button>
      );
    })
  ), [clickedTags, onTagClick]);

  return (
    <TagListWrapper>
      {tagList}
    </TagListWrapper>
  );
};

TagList.propTypes = {
  onTagClick: PropTypes.func.isRequired,
  clickedTags: PropTypes.arrayOf (PropTypes.string),
};

TagList.defaultProps = {
  clickedTags: [],
};

export default TagList;
