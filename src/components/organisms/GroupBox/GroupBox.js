import React from 'react';
import PropTypes from 'prop-types';

import { GroupType } from 'lib/propTypes';

import GroupBoxP from './GroupBoxP';
import GroupBoxS from './GroupBoxS';

const GroupBox = ({ type, ...props }) => {
  switch (type) {
  case 'profile':
    return <GroupBoxP {...props} />;
  case 'simple':
    return <GroupBoxS {...props} />;
  default:
    return null;
  }
};

GroupBox.propTypes = {
  group: GroupType.isRequired,
  type: PropTypes.oneOf (['profile', 'simple']),
};

GroupBox.defaultProps = {
  type: 'profile',
};

export default GroupBox;
