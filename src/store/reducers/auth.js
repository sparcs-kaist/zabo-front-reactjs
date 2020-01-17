import { createAction, handleActions } from 'redux-actions';
import { Map, fromJS, List } from 'immutable';
import { pender } from 'redux-pender';
import jwt from 'jsonwebtoken';
import axios from 'lib/axios';
import storage from 'lib/storage';

import * as AuthAPI from '../../lib/api/auth';

// Action types
const LOGIN_CALLBACK = 'auth/LOGIN_CALLBACK';
const CHECK_AUTH = 'auth/CHECK_AUTH';
const LOGOUT = 'auth/LOGOUT';
const UPDATE_USER_INFO = 'auth/UPDATE_USER_INFO';
const SET_CURRENT_GROUP = 'user/SET_CURRENT_GROUP';
const REMOVE_GROUP_USER = 'group/REMOVE_GROUP_USER';

// Action creator
export const loginCallback = createAction (LOGIN_CALLBACK, AuthAPI.loginCallback);
export const checkAuth = createAction (CHECK_AUTH, AuthAPI.checkAuth, meta => meta);
export const logout = createAction (LOGOUT);
export const updateUserInfo = createAction (UPDATE_USER_INFO, AuthAPI.updateUserInfo, meta => meta);
export const setCurrentGroup = createAction (SET_CURRENT_GROUP, AuthAPI.setCurrentGroup);
export const removeGroupUser = createAction (REMOVE_GROUP_USER, AuthAPI.removeGroupUser);

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
        return state.set ('jwt', fromJS (decoded)).set ('info', fromJS (user));
      },
    }),
    ...pender ({
      type: CHECK_AUTH,
      onSuccess: (state, action) => {
        const user = action.payload;
        const token = action.meta;
        const decoded = jwt.decode (token);
        return state.set ('jwt', fromJS (decoded)).set ('info', fromJS (user));
      },
    }),
    [LOGOUT]: (state, action) => {
      storage.removeItem ('token');
      axios.updateToken ('');
      window.location.href = '/';
      return state.set ('jwt', initialState.get ('jwt')).set ('info', initialState.get ('info'));
    },
    ...pender ({
      type: SET_CURRENT_GROUP,
      onSuccess: (state, action) => state.setIn (['info', 'currentGroup'], fromJS (action.payload)),
    }),
    ...pender ({
      type: REMOVE_GROUP_USER,
      onSuccess: (state, action) => state.setIn (['info', 'currentGroup', 'members'], fromJS (action.payload.members)),
    }),
    ...pender ({
      type: UPDATE_USER_INFO,
      onSuccess: (state, action) => state.set ('info', fromJS (action.payload)),
    }),
  },
  initialState,
);
