import axios from "../axios"

export const loginCallback = (code, state) => axios.post("/auth/login/callback", { code, state }).then(res => res.data)
