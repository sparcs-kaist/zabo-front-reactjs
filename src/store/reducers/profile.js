import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import { fromJS, Map } from 'immutable';

import axios from 'lib/axios';

const api = {
  fetchProfile: (name) => axios.get (`/profile/${name}`),
  addGroupMember: ({ groupName, userId, role }) => axios.put (`/group/${groupName}/member`, { userId, role }),
  updateGroupMember: ({ groupName, userId, role }) => axios.post (`/group/${groupName}/member`, { userId, role }),
  removeGroupUser: ({ groupName, userId }) => axios.delete (`/group/${groupName}/member`, { data: { userId } }),
};

const GET_PROFILE = 'profile/GET_PROFILE';
const ADD_GROUP_MEMBER = 'profile/ADD_GROUP_MEMBER';
const UPDATE_GROUP_MEMBER = 'profile/UPDATE_GROUP_MEMBER';
const REMOVE_GROUP_MEMBER = 'profile/REMOVE_GROUP_MEMBER';

export const getProfile = createAction (GET_PROFILE, api.fetchProfile, meta => meta);
export const addGroupMember = createAction (ADD_GROUP_MEMBER, api.addGroupMember, meta => meta);
export const updateGroupMember = createAction (UPDATE_GROUP_MEMBER, api.updateGroupMember, meta => meta);
export const removeGroupMember = createAction (REMOVE_GROUP_MEMBER, api.removeGroupUser, meta => meta);

const initialState = Map ({
  profiles: Map ({}),
});

export default handleActions ({
  ...pender ({
    type: GET_PROFILE,
    onSuccess: (state, action) => {
      const profile = action.payload;
      const name = action.meta;
      return state.setIn (['profiles', name], fromJS (profile));
    },
    onFailure: (state, action) => {
      const error = action.payload;
      const name = action.meta;
      return state.setIn (['profiles', name], fromJS (error));
    },
  }),
  ...pender ({
    type: ADD_GROUP_MEMBER,
    onSuccess: (state, action) => {
      const { members } = action.payload;
      const { groupName } = action.meta;
      return state.setIn (['profiles', groupName, 'members'], fromJS (members));
    },
  }),
  ...pender ({
    type: UPDATE_GROUP_MEMBER,
    onSuccess: (state, action) => {
      const { members } = action.payload;
      const { groupName } = action.meta;
      return state.setIn (['profiles', groupName, 'members'], fromJS (members));
    },
  }),
  ...pender ({
    type: REMOVE_GROUP_MEMBER,
    onSuccess: (state, action) => {
      const { members } = action.payload;
      const { groupName } = action.meta;
      return state.setIn (['profiles', groupName, 'members'], fromJS (members));
    },
  }),
}, initialState);
