import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { NotFound } from 'components/pages';
import { getProfile } from '../../../store/reducers/profile';

import UserProfile from './UserProfilePage';
import GroupProfile from './GroupProfilePage';


const ProfilePage = () => {
  const { name } = useParams ();
  const dispatch = useDispatch ();
  const profileImmutable = useSelector (state => state.getIn (['profile', 'profiles', name]));
  useEffect (() => {
    dispatch (getProfile (name))
      .catch (error => {});
  }, [name]);
  if (!profileImmutable) return null;
  const profile = profileImmutable.toJS ();
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
