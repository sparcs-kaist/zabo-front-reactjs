import React from 'react';
import PropTypes from 'prop-types';

import { GroupType } from '../../../lib/propTypes';

const GroupProfile = ({ profile }) => {
  const { name } = profile;
  return <h1>Group {name}</h1>;
};

GroupProfile.propTypes = {
  profile: PropTypes.shape (GroupType).isRequired,
};

export default GroupProfile;
