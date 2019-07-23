import axios from "../axios";

export const uploadZabo = (formData, onUploadProgress = () => {}) =>
  axios.post("/zabo", formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress: progressEvent => {
      let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
      // do whatever you like with the percentage complete
      // maybe dispatch an action that will update a progress bar or something
      onUploadProgress(percentCompleted)
    }
  })
