import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import get from 'lodash.get';

import { NotFound } from 'components/pages';

import { getProfile } from 'store/reducers/profile';

import GroupProfile from './GroupProfilePage';
import UserProfile from './UserProfilePage';


const ProfilePage = () => {
  const { name } = useParams ();
  const dispatch = useDispatch ();
  useEffect (() => {
    dispatch (getProfile (name)).catch (error => {});
  }, [name]);
  const profile = useSelector (state => get (state, ['profile', 'profiles', name]));
  if (!profile) return null;
  if (profile.error) return <NotFound />;
  if (profile.username === name) return <UserProfile profile={profile} />;
  if (profile.name === name) return <GroupProfile profile={profile} />;
  return null;
};


ProfilePage.propTypes = {

};

ProfilePage.defaultProps = {

};

export default ProfilePage;
