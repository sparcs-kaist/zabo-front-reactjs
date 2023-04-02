import axios from "lib/axios";

import type { User } from "lib/interface";

export const loginCallback = (code: string, state: string, update?: boolean) =>
  axios.post<{
    token: string;
    user: User;
  }>("/auth/login/callback", {
    code,
    state,
    update,
  });

export const checkAuth = () => axios.get<User>("/auth");
