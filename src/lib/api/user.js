import axios from "../axios"

export const set_CurrentGroup = ( groupId ) => {
 return  axios.post(`/user/currentGroup/${ groupId }`).then(res => res.data)};