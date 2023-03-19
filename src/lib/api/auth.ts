import axios from "lib/axios";

import type { User, GroupApply } from "lib/interface";

interface UserWithPendingGroups extends User {
  pendingGroups?: Pick<GroupApply, "_id" | "name" | "profilePhoto" | "subtitle">[];
}

export const loginCallback = (code: string, state: string, update?: boolean) =>
  axios.post<{
    token: string;
    user: UserWithPendingGroups;
  }>("/auth/login/callback", {
    code,
    state,
    update,
  });

export const checkAuth = () => axios.get<UserWithPendingGroups>("/auth");
