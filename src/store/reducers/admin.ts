import produce, { setAutoFreeze } from 'immer';
import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import {
  IGroup, IGroupMap, IUser, IUserMap,
} from 'types/index.d';

import axios from 'lib/axios';

const AdminAPIs : {
  [key : string] : (...params : any[]) => Promise<any>
} = {};

AdminAPIs.getUserList = () => axios.get ('/admin/user/list');
AdminAPIs.getGroupList = () => axios.get ('/admin/group/list');
AdminAPIs.getGroupApplyList = () => axios.get ('/admin/group/applies');
AdminAPIs.acceptGroup = ({ name }) => axios.post ('/admin/group/apply/accept', { name });

// action types
const GET_USER_LIST = 'admin/GET_USER_LIST';
const GET_GROUP_APPLY_LIST = 'admin/GET_GROUP_APPLY_LIST';
const GET_GROUP_LIST = 'admin/GET_GROUP_LIST';
const ACCEPT_APPLY_GROUP = 'admin/ACCEPT_APPLY_GROUP';

// action creators
export const getUserList = createAction (GET_USER_LIST, AdminAPIs.getUserList);
export const getGroupList = createAction (GET_GROUP_LIST, AdminAPIs.getGroupList);
export const getGroupApplyList = createAction (GET_GROUP_APPLY_LIST, AdminAPIs.getGroupApplyList);
export const acceptApplyGroup = createAction (ACCEPT_APPLY_GROUP, AdminAPIs.acceptGroup, meta => meta);

export interface IAdminState {
  pendingGroups : IGroup[];
  groups : IGroup[];
  users : IUser[];
  groupsMap : IGroupMap,
  usersMap : IUserMap,
}

// initial state
const initialState : IAdminState = {
  pendingGroups: [],
  groups: [],
  users: [],
  groupsMap: {},
  usersMap: {},
};

setAutoFreeze (false);

// reducer
export default handleActions (
  {
    ...pender ({
      type: GET_USER_LIST,
      onSuccess: (state, action) => {
        const users = action.payload;
        const usersMap = users.reduce ((acc : IUserMap, cur : IUser) => ({ ...acc, [cur.username]: cur }), {});
        return produce (state, (draft : IAdminState) => {
          draft.users = action.payload;
          draft.usersMap = usersMap;
        });
      },
    }),
    ...pender ({
      type: GET_GROUP_LIST,
      onSuccess: (state, action) => {
        const groups = action.payload;
        const groupsMap = groups.reduce ((acc : IGroupMap, cur : IGroup) => ({ ...acc, [cur.name]: cur }), {});
        return produce (state, (draft : IAdminState) => {
          draft.groups = action.payload;
          Object.assign (draft.groupsMap, groupsMap);
        });
      },
    }),
    ...pender ({
      type: GET_GROUP_APPLY_LIST,
      onSuccess: (state, action) => {
        const groups = action.payload;
        const groupsMap = groups.reduce ((acc : IGroupMap, cur : IGroup) => ({ ...acc, [cur.name]: cur }), {});
        return produce (state, (draft : IAdminState) => {
          draft.pendingGroups = action.payload;
          Object.assign (draft.groupsMap, groupsMap);
        });
      },
    }),
    ...pender ({
      type: ACCEPT_APPLY_GROUP,
      onSuccess: (state, action) => {
        const { name } = action.meta;
        const group = action.payload;
        return produce (state, (draft : IAdminState) => {
          draft.pendingGroups = draft.pendingGroups.filter (pendingGroup => pendingGroup.name !== name);
          draft.groups.unshift (group);
          Object.assign (draft.groupsMap, { [group.name]: group });
        });
      },
    }),
  },
  initialState,
);
