import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';

const SuperTooltip = ({
  title, hide, children, ...props
}) => (
  hide ? children : (
    <Tooltip title={title} {...props} enterTouchDelay={0}>
      {children}
    </Tooltip>
  )
);

SuperTooltip.propTypes = {
  ...Tooltip.propTypes,
  hide: PropTypes.bool,
};

SuperTooltip.defaultProps = {
  ...Tooltip.defaultProps,
  hide: false,
};

export default SuperTooltip;
