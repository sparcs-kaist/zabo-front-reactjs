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

export const getZabo = id => axios.get (`/zabo/${id}`).then (res => res.data);
export const getZaboList = ({ lastSeen, relatedTo }) => axios
  .get ('/zabo/list', { params: { lastSeen, relatedTo } })
  .then (res => res.data.filter (item => item.photos[0] !== undefined));
export const getPins = ({ lastSeen }) => axios
  .get ('/pin/list', { params: { lastSeen } })
  .then (res => res.data.filter (item => item.photos[0] !== undefined));

export const likeZabo = zaboId => axios.post ('/zabo/like', { zaboId }).then (res => res.data);
