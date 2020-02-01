import axios from '../axios';

export const uploadZabo = (formData, onUploadProgress = () => {}) => axios.post ('/zabo', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  onUploadProgress: progressEvent => {
    const percentCompleted = Math.floor ((progressEvent.loaded * 100) / progressEvent.total);
    // do whatever you like with the percentage complete
    // maybe dispatch an action that will update a progress bar or something
    onUploadProgress (percentCompleted);
  },
});

export const getZabo = id => axios.get (`/zabo/${id}`);
export const getZaboList = ({ lastSeen, relatedTo }) => axios
  .get ('/zabo/list', { params: { lastSeen, relatedTo } })
  .then (data => data.filter (item => item.photos[0] !== undefined));
export const getPins = ({ lastSeen }) => axios
  .get ('/user/pins', { params: { lastSeen } })
  .then (data => data.filter (item => item.photos[0] !== undefined));

export const toggleZaboPin = zaboId => axios.post (`/zabo/${zaboId}/pin`);
export const toggleZaboLike = zaboId => axios.post (`/zabo/${zaboId}/like`);

export const getGroupZaboList = ({ groupName, lastSeen }) => axios.get (`/group/${groupName}/zabo/list`, { params: { lastSeen } });
