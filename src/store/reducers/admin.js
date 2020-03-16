import produce, { setAutoFreeze } from 'immer';
import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';

import axios from 'lib/axios';

const AdminAPIs = {};
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

// initial state
const initialState = {
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
        const usersMap = users.reduce ((acc, cur) => ({ ...acc, [cur.username]: cur }), {});
        return produce (state, draft => {
          draft.users = action.payload;
          draft.usersMap = usersMap;
        });
      },
    }),
    ...pender ({
      type: GET_GROUP_LIST,
      onSuccess: (state, action) => {
        const groups = action.payload;
        const groupsMap = groups.reduce ((acc, cur) => ({ ...acc, [cur.name]: cur }), {});
        return produce (state, draft => {
          draft.groups = action.payload;
          Object.assign (draft.groupsMap, groupsMap);
        });
      },
    }),
    ...pender ({
      type: GET_GROUP_APPLY_LIST,
      onSuccess: (state, action) => {
        const groups = action.payload;
        const groupsMap = groups.reduce ((acc, cur) => ({ ...acc, [cur.name]: cur }), {});
        return produce (state, draft => {
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
        return produce (state, draft => {
          draft.pendingGroups = draft.pendingGroups.filter (oendingGroup => oendingGroup.name !== name);
          draft.groups.unshift (group);
          Object.assign (draft.groupsMap, { [group.name]: group });
        });
      },
    }),
  },
  initialState,
);
