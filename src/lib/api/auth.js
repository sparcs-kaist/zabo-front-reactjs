import axios from '../axios';

export const loginCallback = (code, state) => axios.post ('/auth/login/callback', { code, state });
export const checkAuth = () => axios.get ('/auth');
export const updateUserInfo = (data) => axios.post ('/user', data);
export const updateUserInfoWithImage = (formData) => axios.post ('/user', formData);

export const updateGroupInfo = ({
  curName, name, description, subtitle,
}) => axios.post (`/group/${curName}`, { name, description, subtitle });
export const setCurrentGroup = groupName => axios.post (`/user/currentGroup/${groupName}`);
// updateProfilePhoto
export const updateUserProfilePhoto = (formData) => axios.post ('/user/profile', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
export const updateGroupProfilePhoto = (formData, groupName) => axios.post (`/group/${groupName}/profile`, formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
