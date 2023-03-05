import axios from "../axios";

export const loginCallback = (code: string, state: string) =>
  axios.post<{
    token: string;
    user: {
      username: string;
    };
  }>("/auth/login/callback", {
    code,
    state,
  });
export const checkAuth = () => axios.get("/auth");
