import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { CATEGORIES } from 'lib/variables';

const TagListWrapper = styled.div`
  margin-top: 20px;

  button {
    font-size: 16px;
    line-height: 16px;
    color:  #143441;
    padding: 10px 14px;
    margin: 0 12px 10px 0;
    border: 1px solid #143441;
    border-radius: 4px;
    &:hover, &:focus {
      color: white;
      background-color: #143441;
    }
  }
`;

const TagList = ({ onTagClick }) => (
  <TagListWrapper>
    {CATEGORIES.map ((tag, idx) => (
      <button key={idx} value={tag} onClick={onTagClick}>{tag}</button>
    ))}
  </TagListWrapper>
);

TagList.propTypes = {
  onTagClick: PropTypes.func.isRequired,
};

export default TagList;
