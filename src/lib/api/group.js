import axios from '../axios';

/* Auth */
export const updateGroupInfo = ({
  curName, name, description, subtitle, category,
}) => axios.post (`/group/${curName}`, {
  name, description, subtitle, category,
});
export const updateGroupInfoWithImage = ({ curName, formData }) => axios.post (`/group/${curName}`, formData);

/* Profile */
export const addGroupMember = ({ groupName, userId, role }) => axios.put (`/group/${groupName}/member`, { userId, role });
export const updateGroupMember = ({ groupName, userId, role }) => axios.post (`/group/${groupName}/member`, { userId, role });
export const removeGroupUser = ({ groupName, userId }) => axios.delete (`/group/${groupName}/member`, { data: { userId } });
export const applyNewGroup = (data) => axios.post ('/group/apply', data);

/* Main */
export const getRecommendedGroups = () => axios.get ('/group/recommends');
