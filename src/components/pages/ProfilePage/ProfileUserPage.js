import React from 'react';
import PropTypes from 'prop-types';

import { UserType } from '../../../lib/propTypes';

const UserProfile = ({ profile }) => {
  const { username, birthday } = profile;
  return <h1>{username} {birthday}</h1>;
};

UserProfile.propTypes = {
  profile: PropTypes.shape (UserType).isRequired,
};

export default UserProfile;
