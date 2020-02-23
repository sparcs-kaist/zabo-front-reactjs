import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { media } from 'lib/utils/style';

const Col = styled.section`
  display: flex;
  flex-direction: column;
  flex: ${props => props.flex};
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

const Divider = styled.div`
  height: 100%;
  border-right: 1px solid ${props => props.theme.gray10};
  flex: 0 0 0;
  display: none;
  margin: 0 12px;
  ${media.tablet (css`
    display: inherit;
  `)};
`;

const TwoCol = styled.section`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  ${Col} {
    flex-basis: ${props => (props.mobileWrap ? 100 : 0)}%
  }
  ${props => (props.mobileWrap ? css`` : css`
    ${Divider} {
      display: inherit;
    }
  `)};
  ${media.tablet (css`
    ${Col} {
      flex-basis: 0;
    }
  `)};
`;

TwoCol.propTypes = {
  mobileWrap: PropTypes.bool,
};
TwoCol.defaultProps = {
  mobileWrap: true,
};

TwoCol.Left = Col;
TwoCol.Right = Col;
TwoCol.Divider = Divider;

export default TwoCol;
