import axios from "../axios";

// 사용자는 추가 안해도 되나..? 누가 올린지 알아야지
export const uploadZabo = (formData) => {
  axios.post("/zabo/uploadimgtos3", formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};
