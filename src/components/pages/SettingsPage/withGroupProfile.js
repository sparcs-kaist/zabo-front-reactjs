import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import get from 'lodash.get';

import { ForbiddenPage, NotFound } from 'components/pages';

import { getProfile } from 'store/reducers/profile';

const withGroupProfile = (WrappedComponent, isPrivate = false) => props => {
  const dispatch = useDispatch ();
  const { groupName } = props;

  useEffect (() => {
    dispatch (getProfile (groupName));
  }, [groupName]);

  const profile = useSelector (state => get (state, ['profile', 'profiles', groupName]));
  if (!profile) return null;
  if (profile.status === 403) return <ForbiddenPage />;
  if (profile.error) return <NotFound />;
  if (isPrivate && !profile.myRole) return <ForbiddenPage />;
  return <WrappedComponent {...props} profile={profile} />;
};

export default withGroupProfile;
