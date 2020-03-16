import produce from 'immer';
import get from 'lodash.get';
import set from 'lodash.set';
import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';

import * as GroupAPIs from 'lib/api/group';
import * as ProfileAPIs from 'lib/api/profile';

const GET_PROFILE = 'profile/GET_PROFILE';
const ADD_GROUP_MEMBER = 'profile/ADD_GROUP_MEMBER';
const UPDATE_GROUP_MEMBER = 'profile/UPDATE_GROUP_MEMBER';
const REMOVE_GROUP_MEMBER = 'profile/REMOVE_GROUP_MEMBER';
const FOLLOW_PROFILE = 'profile/FOLLOW_PROFILE';

export const getProfile = createAction (GET_PROFILE, ProfileAPIs.fetchProfile, meta => meta);
export const addGroupMember = createAction (ADD_GROUP_MEMBER, GroupAPIs.addGroupMember, meta => meta);
export const updateGroupMember = createAction (UPDATE_GROUP_MEMBER, GroupAPIs.updateGroupMember, meta => meta);
export const removeGroupMember = createAction (REMOVE_GROUP_MEMBER, GroupAPIs.removeGroupUser, meta => meta);
export const followProfile = createAction (FOLLOW_PROFILE, ProfileAPIs.followProfile, meta => meta);

const initialState = {
  profiles: {},
};

export default handleActions ({
  ...pender ({
    type: GET_PROFILE,
    onSuccess: (state, action) => {
      const profile = action.payload;
      const name = action.meta;
      return produce (state, draft => {
        draft.profiles[name] = profile;
      });
    },
    onFailure: (state, action) => {
      const error = action.payload;
      const name = action.meta;
      return produce (state, draft => {
        draft.profiles[name] = error;
      });
    },
  }),
  ...pender ({
    type: ADD_GROUP_MEMBER,
    onSuccess: (state, action) => {
      const { members } = action.payload;
      const { groupName } = action.meta;
      return produce (state, draft => {
        set (draft, ['profile', groupName, 'members'], members);
      });
    },
  }),
  ...pender ({
    type: UPDATE_GROUP_MEMBER,
    onSuccess: (state, action) => {
      const { members } = action.payload;
      const { groupName } = action.meta;
      return produce (state, draft => {
        set (draft, ['profiles', groupName, 'members'], members);
      });
    },
  }),
  ...pender ({
    type: REMOVE_GROUP_MEMBER,
    onSuccess: (state, action) => {
      const { members } = action.payload;
      const { groupName } = action.meta;
      return produce (state, draft => {
        set (draft, ['profiles', groupName, 'members'], members);
      });
    },
  }),
  ...pender ({
    type: FOLLOW_PROFILE,
    onSuccess: (state, action) => {
      const { name } = action.meta;
      return produce (state, draft => {
        Object.assign (draft.profiles[name], action.payload);
      });
    },
  }),
}, initialState);
