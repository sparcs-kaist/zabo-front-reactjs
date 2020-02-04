import { createAction, handleActions } from 'redux-actions';
import { Map, fromJS, List } from 'immutable';
import { pender } from 'redux-pender';
import jwt from 'jsonwebtoken';
import axios from 'lib/axios';
import storage from 'lib/storage';

import * as AuthAPI from '../../lib/api/auth';

// Action types
const LOGIN_CALLBACK = 'auth/LOGIN_CALLBACK';
export const CHECK_AUTH = 'auth/CHECK_AUTH';
const LOGOUT = 'auth/LOGOUT';
const UPDATE_USER_INFO = 'auth/UPDATE_USER_INFO';
const UPDATE_GROUP_INFO = 'group/UPDATE_GROUP_INFO';
const SET_CURRENT_GROUP = 'user/SET_CURRENT_GROUP';

// Action creator
export const loginCallback = createAction (LOGIN_CALLBACK, AuthAPI.loginCallback);
export const checkAuth = createAction (CHECK_AUTH, AuthAPI.checkAuth, meta => meta);
export const logout = createAction (LOGOUT);
export const updateUserInfo = createAction (UPDATE_USER_INFO, AuthAPI.updateUserInfo, meta => meta);
export const updateGroupInfo = createAction (UPDATE_GROUP_INFO, AuthAPI.updateGroupInfo, meta => meta);
export const setCurrentGroup = createAction (SET_CURRENT_GROUP, AuthAPI.setCurrentGroup);

/*
 * group : { _id: String, name: String, members: [member] }
 * member: { _id: String, studentId: String, isAdmin: Boolean }
 * board: { _id: String, title: String }
 */
const initialState = Map ({
  jwt: Map ({}),
  info: Map ({
    _id: '',
    sso_uid: '',
    sso_sid: '',
    lastName: '',
    firstName: '',
    email: '',
    birthday: '',
    gender: '',
    kaistPersonType: '',
    studentId: '',
    currentGroup: null,
    isAdmin: false,
    flags: List ([]),
    boards: List ([]),
    groups: List ([]),
  }),
});

export default handleActions (
  {
    ...pender ({
      type: LOGIN_CALLBACK,
      onSuccess: (state, action) => {
        const { token, user } = action.payload;
        const decoded = jwt.decode (token);
        storage.setItem ('token', token);
        axios.updateToken (token);
        const currentGroup = user.groups.find (group => group._id === user.currentGroup);
        if (currentGroup) user.currentGroup = currentGroup;
        return state
          .set ('jwt', fromJS (decoded))
          .set ('info', fromJS (user));
      },
    }),
    ...pender ({
      type: CHECK_AUTH,
      onPending: (state, action) => state.set ('jwt', fromJS (jwt.decode (action.meta))),
      onSuccess: (state, action) => {
        const user = action.payload;
        const currentGroup = user.groups.find (group => group._id === user.currentGroup);
        if (currentGroup) user.currentGroup = currentGroup;
        return state.set ('info', fromJS (user));
      },
    }),
    [LOGOUT]: (state) => {
      storage.removeItem ('token');
      axios.updateToken ('');
      window.location.reload ();
      return state.set ('jwt', initialState.get ('jwt')).set ('info', initialState.get ('info'));
    },
    ...pender ({
      type: SET_CURRENT_GROUP,
      onSuccess: (state, action) => {
        const { currentGroup: currentGroupId } = action.payload;
        const currentGroup = state.getIn (['info', 'groups']).find (group => group.get ('_id') === currentGroupId);
        return state.setIn (['info', 'currentGroup'], currentGroup);
      },
    }),
    ...pender ({
      type: UPDATE_USER_INFO,
      onSuccess: (state, action) => state.update ('info', prev => prev.merge (fromJS (action.payload))),
    }),
    ...pender ({
      type: UPDATE_GROUP_INFO,
      onSuccess: (state, action) => {
        const { name } = action.meta;
        const groupIndex = state.getIn (['info', 'groups']).findIndex (group => group.get ('name') === name);
        return state.updateIn (['info', 'groups', groupIndex], prev => prev.merge (fromJS (action.payload)));
      },
    }),
  },
  initialState,
);
