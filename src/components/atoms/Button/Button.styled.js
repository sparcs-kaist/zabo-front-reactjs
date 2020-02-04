import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { getSize, media } from '../../../lib/utils/style';
import { colors } from '../../../lib/theme';

export const disabled = css`
  background-color: #f7f8f9;
  border-color: ${colors.gray1};
  color: ${colors.gray1};
  cursor: not-allowed;
`;

const StyledButton = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  font-size: 12px;
  border-radius: 15px;
  background-color: ${props => colors[props.background] || props.background || colors.gray3};
  border: 1px solid ${props => colors[props.border] || props.border || colors.gray60};
  outline: none;
  
  width: ${props => (
    props.width ? getSize ('width') (props)
      : props.xSmall ? '120px'
        : props.small ? '180px'
          : props.normal ? '240px'
            : props.large ? '480px'
              : 'auto')};

  ${media.tablet`
    height: 30px;
    font-size: 12px;
    width: ${props => (
    props.width ? getSize ('tWidth') (props)
      : props.xSmall ? '120px'
        : props.small ? '180px'
          : props.normal ? '240px'
            : props.large ? '480px'
              : 'auto')};
  `};

  ${props => props.disabled && disabled};

  a {
    text-decoration: none;
    color: inherit;
  }
`;

StyledButton.propTypes = {
  xSmall: PropTypes.bool,
  small: PropTypes.bool,
  normal: PropTypes.bool,
  large: PropTypes.bool,
  width: PropTypes.oneOfType ([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  background: PropTypes.oneOf (Object.keys (colors)),
  border: PropTypes.oneOf (Object.keys (colors)),
};

StyledButton.defaultProps = {
  xSmall: false,
  small: false,
  normal: false,
  large: false,
  disabled: false,
  background: 'grey1',
  border: 'grey1',
};

export const ButtonGroup = styled.div`
  display: flex;
  button + button {
    margin-left: 6px;
  }
`;

export default StyledButton;
