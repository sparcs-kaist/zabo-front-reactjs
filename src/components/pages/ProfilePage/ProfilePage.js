import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { NotFound } from 'components/pages';
import { getProfile } from '../../../store/reducers/profile';

import UserProfile from './ProfileUserPage';
import GroupProfile from './ProfileGroupPage';


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
  console.log ({ profile });
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
