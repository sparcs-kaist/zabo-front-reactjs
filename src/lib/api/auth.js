import axios from "../axios";

export const loginCallback = (code, state) => axios.post("/auth/login/callback", { code, state }).then(res => res.data)
export const checkAuth = () => axios.get('/auth').then(res => res.data)

export const setCurrentGroup = ( groupId ) => axios.post(`/user/currentGroup/${ groupId }`).then(res => res.data);