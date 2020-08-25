import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledList = styled.div`
  width: 100%;
`;

const List = ({ dataSource, renderItem }) => (
  <StyledList>
    {dataSource.map (renderItem)}
  </StyledList>
);

List.propTypes = {
  dataSource: PropTypes.arrayOf (PropTypes.shape ({

  })).isRequired,
  renderItem: PropTypes.func,
};

List.defaultProps = {
  renderItem: item => <div key={item}>{item}</div>,
};

export default List;
