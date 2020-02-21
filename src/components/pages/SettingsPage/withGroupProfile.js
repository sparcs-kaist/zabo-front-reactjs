import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { NotFound } from 'pages';

import { getProfile } from 'store/reducers/profile';

const withGroupProfile = (WrappedComponent, isPrivate = false) => (props) => {
  const dispatch = useDispatch ();
  const { groupName } = props;

  useEffect (() => {
    dispatch (getProfile (groupName));
  }, [groupName]);

  const profileImmutable = useSelector (state => state.getIn (['profile', 'profiles', groupName]));
  const profile = useMemo (() => (profileImmutable ? profileImmutable.toJS () : null), [profileImmutable]);
  if (!profile) return null;
  if (profile.error) return <NotFound />;
  if (isPrivate && !profile.myRole) return <NotFound />;
  return <WrappedComponent {...props} profile={profile} />;
};

export default withGroupProfile;
