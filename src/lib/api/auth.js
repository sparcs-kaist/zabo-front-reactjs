import axios from "../axios";

export const loginCallback = (code, state) => axios.post("/auth/login/callback", { code, state });
export const checkAuth = () => axios.get("/auth");
