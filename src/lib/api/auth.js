import axios from '../axios';

export const loginCallback = (code, state) => axios.post ('/auth/login/callback', { code, state });
export const checkAuth = () => axios.get ('/auth');
export const updateUserInfo = (data) => axios.post ('/user', data);
export const updateGroupInfo = ({ curName, name, description }) => axios.post (`/group/${curName}`, { name, description });
// TODO : change groupId -> groupName
export const setCurrentGroup = groupId => axios.post (`/user/currentGroup/${groupId}`);
export const removeGroupUser = (groupId, studentId) => axios.delete (`/group/${groupId}/member`, { data: { studentId } });
