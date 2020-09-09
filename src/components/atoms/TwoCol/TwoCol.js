import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { media } from 'lib/utils/style';

const colMixin = css`
  display: flex;
  flex-direction: column;
  flex: ${props => props.flex} 0 0;
  flex-shrink: 0;
  flex-basis: auto;
  min-width: 0;
  ${media.tablet (css`
    flex: ${props => props.flex};
  `)};
`;

const Left = styled.section`
  ${colMixin};
`;
Left.propTypes = {
  flex: PropTypes.number,
};
Left.defaultProps = {
  flex: 1,
};


const Right = styled.section`
  ${colMixin};
`;
Right.propTypes = {
  flex: PropTypes.number,
};
Right.defaultProps = {
  flex: 1,
};


const TwoCol = styled.section`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  flex-shrink: 0;
  flex-basis: auto;
  ${props => (props.mobileWrap ? css`
    flex-direction: column;
  ` : '')};
 
  ${media.tablet (css`
    flex-direction: row;
    flex-wrap: nowrap;
    ${props => (props.divider ? css`
      ${Left} {
        padding-right: 24px;
        border-right: 1px solid ${props => props.theme.gray10};
      }
      ${Right} {
        padding-left: 24px;
      }
    ` : '')};
  `)};
`;

TwoCol.propTypes = {
  mobileWrap: PropTypes.bool,
};
TwoCol.defaultProps = {
  mobileWrap: true,
};

TwoCol.Left = Left;
TwoCol.Right = Right;

TwoCol.DLeft = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
TwoCol.DRight = styled.div`
  flex: 1;
`;

export default TwoCol;
