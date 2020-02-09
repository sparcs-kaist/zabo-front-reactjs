import axios from '../axios';

/* Auth */
export const updateUserInfo = (data) => axios.post ('/user', data);
export const updateUserInfoWithImage = (formData) => axios.post ('/user', formData);
export const setCurrentGroup = groupName => axios.post (`/user/currentGroup/${groupName}`);
