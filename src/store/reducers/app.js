import { createAction, handleActions } from "redux-actions"
import { Map } from "immutable"
import { pender } from "redux-pender"
import get from "lodash.get"

// action types
const TOGGLE_VISUAL_TEXT = "app/TOGGLE_VISUAL_TEXT"
const CHANGE_VISUAL_TEXT_COLOR = "app/CHANGE_VISUAL_TEXT_COLOR"

//action creators
export const toggleVisualText = createAction(TOGGLE_VISUAL_TEXT)
export const changeVisualTextColor = createAction(
	CHANGE_VISUAL_TEXT_COLOR,
	(color) => {
		switch (color) {
			case "red":
				return {
					color: "#FF0000"
				}
			case "blue":
				return {
					color: "#0000FF"
				}
		}
	}
)

// initial state
const initialState = Map({
	showVisualText: false,
	visualTextColor: "#ffffff",
})

// reducer
export default handleActions({
	[TOGGLE_VISUAL_TEXT]: (state, action) => {
		return state.set("showVisualText", true)
	},
	[CHANGE_VISUAL_TEXT_COLOR]: (state, action) => {
		return state.set("visualTextColor", action.payload.color)
	}

}, initialState)
