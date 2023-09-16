import produce from "immer";
import jwtDecode from "jwt-decode";
import { get } from "lodash";
import { createAction, handleActions } from "redux-actions";
import { pender } from "redux-pender";
import type { IGroup, IJwt, IUser } from "types/index.d";

import * as AuthAPIs from "lib/api/auth";
import * as GroupAPIs from "lib/api/group";
import * as UserAPIs from "lib/api/user";
import axios from "lib/axios";
import storage from "lib/storage";

// Action types
const LOGIN_CALLBACK = "auth/LOGIN_CALLBACK";
export const CHECK_AUTH = "auth/CHECK_AUTH";
const LOGOUT = "auth/LOGOUT";
const UPDATE_USER_INFO = "auth/UPDATE_USER_INFO";
const UPDATE_GROUP_INFO = "group/UPDATE_GROUP_INFO";
const SET_CURRENT_GROUP = "user/SET_CURRENT_GROUP";
const APPLY_NEW_GROUP = "group/APPLY_NEW_GROUP";

// Action creator
export const loginCallback = createAction(LOGIN_CALLBACK, AuthAPIs.loginCallback);
export const checkAuth = createAction(CHECK_AUTH, AuthAPIs.checkAuth, (meta) => meta);
export const logout = createAction(LOGOUT);
export const updateUserInfo = createAction(
  UPDATE_USER_INFO,
  UserAPIs.updateUserInfo,
  (meta) => meta,
);
export const updateUserInfoWithImage = createAction(
  UPDATE_USER_INFO,
  UserAPIs.updateUserInfoWithImage,
  (meta) => meta,
);
export const updateGroupInfo = createAction(
  UPDATE_GROUP_INFO,
  GroupAPIs.updateGroupInfo,
  (meta) => meta,
);
export const updateGroupInfoWithImage = createAction(
  UPDATE_GROUP_INFO,
  GroupAPIs.updateGroupInfoWithImage,
  (meta) => meta,
);
export const setCurrentGroup = createAction(SET_CURRENT_GROUP, UserAPIs.setCurrentGroup);
export const applyNewGroup = createAction(APPLY_NEW_GROUP, GroupAPIs.applyNewGroup);

export interface IAuthState {
  jwt?: IJwt;
  info?: IUser;
}
/*
 * group : { _id: String, name: String, members: [member] }
 * member: { _id: String, studentId: String, isAdmin: Boolean }
 * board: { _id: String, title: String }
 */
const initialState: IAuthState = {
  jwt: undefined,
  info: {
    _id: "",
    sso_uid: "",
    sso_sid: "",
    username: "",
    profilePhoto: "",
    lastName: "",
    firstName: "",
    email: "",
    birthday: "",
    gender: "",
    kaistPersonType: "",
    studentId: "",
    currentGroup: null,
    isAdmin: false,
    flags: [],
    boards: [],
    groups: [],
    pendingGroups: [],
  },
};

export default handleActions(
  {
    ...pender({
      type: LOGIN_CALLBACK,
      onSuccess: (state, action) => {
        const { token, user } = action.payload;
        const decoded = jwtDecode(token);
        storage.setItem("token", token);
        axios.updateToken(token);
        const currentGroup = user.groups.find((group: IGroup) => group._id === user.currentGroup);
        if (currentGroup) user.currentGroup = currentGroup;
        return produce(state, (draft: IAuthState) => {
          if (decoded && typeof decoded === "object") draft.jwt = decoded as IJwt;
          draft.info = user;
        });
      },
    }),
    ...pender({
      type: CHECK_AUTH,
      onPending: (state, action) =>
        produce(state, (draft: IAuthState) => {
          const decoded = jwtDecode(action.meta);
          if (decoded && typeof decoded === "object") draft.jwt = decoded as IJwt;
        }),
      onSuccess: (state, action) => {
        const user = action.payload;
        const currentGroup = user.groups.find((group: IGroup) => group._id === user.currentGroup);
        if (currentGroup) user.currentGroup = currentGroup;
        return produce(state, (draft: IAuthState) => {
          draft.info = user;
        });
      },
      onError: () => {
        storage.removeItem("token");
        axios.updateToken("");
        return initialState;
      },
    }),
    [LOGOUT]: (state) => {
      storage.removeItem("token");
      axios.updateToken("");
      window.location.href = "/";
      return produce(state, (draft: IAuthState) => {
        draft.jwt = initialState.jwt;
        draft.info = initialState.info;
      });
    },
    ...pender({
      type: SET_CURRENT_GROUP,
      onSuccess: (state, action) => {
        const { currentGroup: currentGroupId } = action.payload;
        const currentGroup = get(state, ["info", "groups"]).find(
          (group: IGroup) => group._id === currentGroupId,
        );
        return produce(state, (draft: IAuthState) => {
          if (draft.info) draft.info.currentGroup = currentGroup;
        });
      },
    }),
    ...pender({
      type: UPDATE_USER_INFO,
      onSuccess: (state, action) =>
        produce(state, (draft: IAuthState) => {
          Object.assign(draft.info ?? {}, action.payload);
        }),
    }),
    ...pender({
      type: UPDATE_GROUP_INFO,
      onSuccess: (state, action) => {
        const { name } = action.meta;
        const groupIndex = get(state, ["info", "groups"]).findIndex(
          (group: IGroup) => group.name === name,
        );
        return produce(state, (draft: IAuthState) => {
          if (draft.info) Object.assign(draft.info.groups[groupIndex], action.payload);
        });
      },
    }),
    ...pender({
      type: APPLY_NEW_GROUP,
      onSuccess: (state, action) =>
        produce(state, (draft: IAuthState) => {
          if (draft.info) draft.info.pendingGroups.push(action.payload);
        }),
    }),
  },
  initialState,
);
