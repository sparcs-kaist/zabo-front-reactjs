import { createAction, handleActions } from "redux-actions"
import { Map, fromJS } from "immutable"
import { pender } from "redux-pender"
import jwt from "jsonwebtoken"

import * as AuthAPI from "../../lib/api/auth"

// Action types
const LOGIN_CALLBACK = 'auth/LOGIN_CALLBACK'

// Action creator
export const loginCallback = createAction(LOGIN_CALLBACK, AuthAPI.loginCallback)

const initialState = Map({
	jwt: Map({

	}),
	info: Map({})
})

export default handleActions({
	...pender({
		type: LOGIN_CALLBACK,
		onSuccess: (state, action) => {
			const { token, user } = action.payload
			const decoded = jwt.decode(token)
			return state
				.set('jwt', fromJS(decoded))
				.set('info', fromJS(user))
		}
	})
}, initialState)
