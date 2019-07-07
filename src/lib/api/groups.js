import axios from "../axios";

export const loadGroupInfo = (groupId) => axios.post("/group", {groupId}).then(res => res.data);
