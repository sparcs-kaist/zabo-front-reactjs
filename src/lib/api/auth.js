import axios from '../axios';

export const loginCallback = (code, state) => axios.post ('/auth/login/callback', { code, state });
export const checkAuth = () => axios.get ('/auth');
export const updateUserInfo = (data) => axios.post ('/user', data);
export const updateGroupInfo = ({ curName, name, description }) => axios.post (`/group/${curName}`, { name, description });

export const setCurrentGroup = groupName => axios.post (`/user/currentGroup/${groupName}`);
