import { createAction, handleActions } from "redux-actions"
import { Map } from "immutable"

// action types
const SHOW_HEADING = "showHide/SHOW_HEADING"
const HIDE_HEADING = "showHide/HIDE_HEADING"

//action creators
export const showHeading = createAction(SHOW_HEADING)
export const hideHeading = createAction(HIDE_HEADING)

// initial state
const initialState = Map({
	showText: false,
})

// reducer
export default handleActions({
	[SHOW_HEADING]: (state, action) => {
	  return state.set("showText", true)
	},
	[HIDE_HEADING]: (state, action) => {
		return state.set("showText", false)
	},
}, initialState)
