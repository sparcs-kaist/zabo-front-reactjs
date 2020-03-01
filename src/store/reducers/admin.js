import { fromJS, List, Map } from 'immutable';
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
const initialState = Map ({
  pendingGroups: List ([]),
  groups: List ([]),
  users: List ([]),
});

// reducer
export default handleActions (
  {
    ...pender ({
      type: GET_USER_LIST,
      onSuccess: (state, action) => state.set ('users', fromJS (action.payload)),
    }),
    ...pender ({
      type: GET_GROUP_LIST,
      onSuccess: (state, action) => state.set ('groups', fromJS (action.payload)),
    }),
    ...pender ({
      type: GET_GROUP_APPLY_LIST,
      onSuccess: (state, action) => state.set ('pendingGroups', fromJS (action.payload)),
    }),
    ...pender ({
      type: ACCEPT_APPLY_GROUP,
      onSuccess: (state, action) => {
        const { name } = action.meta;
        return state
          .update ('pendingGroups', prev => prev.filter (group => group.get ('name') !== name))
          .update ('groups', prev => prev.unshift (fromJS (action.payload)));
      },
    }),
  },
  initialState,
);
