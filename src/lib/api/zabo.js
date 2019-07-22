import axios from "../axios";

// 사용자는 추가 안해도 되나..? 누가 올린지 알아야지
export const uploadZabo = (formData, onUploadProgress = () => {}) =>
  axios.post("/zabo/uploadimgtos3", formData, {
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
