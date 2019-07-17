import { createAction, handleActions } from "redux-actions"
import { Map, fromJS } from "immutable"
import { pender } from "redux-pender"
import jwt from "jsonwebtoken"
import axios from "lib/axios"
import storage from "lib/storage"

import * as AuthAPI from "../../lib/api/auth"

// Action types
const LOGIN_CALLBACK = 'auth/LOGIN_CALLBACK'
const CHECK_AUTH = 'auth/CHECK_AUTH'
const LOGOUT = 'auth/LOGOUT'

const SET_CURRENT_GROUP = 'user/SET_CURRENT_GROUP'

// Action creator
export const loginCallback = createAction(LOGIN_CALLBACK, AuthAPI.loginCallback)
export const checkAuth = createAction(CHECK_AUTH, AuthAPI.checkAuth, meta => meta)
export const logout = createAction(LOGOUT)
export const setCurrentGroup = createAction(SET_CURRENT_GROUP,AuthAPI.setCurrentGroup);

const initialState = Map({
	jwt: Map({}),
	info: Map({})
})

export default handleActions({
	...pender({
		type: LOGIN_CALLBACK,
		onSuccess: (state, action) => {
			const { token, user } = action.payload
			const decoded = jwt.decode(token)
			storage.setItem("token", token)
			axios.updateToken(token)
			return state
				.set('jwt', fromJS(decoded))
				.set('info', fromJS(user))
		}
	}),
	...pender({
		type: CHECK_AUTH,
		onSuccess: (state, action) => {
			const user = action.payload
			const token = action.meta
			const decoded = jwt.decode(token)
			return state
				.set('jwt', fromJS(decoded))
				.set('info', fromJS(user))
		}
	}),
	[LOGOUT]: (state, action) => {
		storage.removeItem('token')
		axios.updateToken('')
		return state
			.set('jwt', initialState.get('jwt'))
			.set('info', initialState.get('info'))
	},
  ...pender({
    type: SET_CURRENT_GROUP,
    onSuccess: (state, action) => {
      const { currentGroup } = action.payload;
      console.log(action.payload);
      return state.setIn(['info', 'currentGroup'], fromJS(currentGroup))
    },
  })
}, initialState)
