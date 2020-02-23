import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { media } from 'lib/utils/style';

const Col = styled.section`
  display: flex;
  flex-direction: column;
  flex: ${props => props.flex} 0 100%;
  ${media.tablet (css`
    flex: ${props => props.flex};
  `)};
`;
Col.propTypes = {
  flex: PropTypes.number,
};
Col.defaultProps = {
  flex: 1,
};

const TwoCol = styled.section`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`;

TwoCol.Left = Col;
TwoCol.Right = Col;

export default TwoCol;
