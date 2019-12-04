import { createAction, handleActions } from "redux-actions"
import { fromJS, Map } from "immutable"

// action types
const UPDATE_WINDOW_SIZE = "app/UPDATE_WINDOW_SIZE"

//action creators
export const setWindowSize = createAction(UPDATE_WINDOW_SIZE)

// initial state
const initialState = Map({
	windowSize: Map({
		width: window.innerWidth,
		height: window.innerHeight,
	}),
})

// reducer
export default handleActions(
	{
		[UPDATE_WINDOW_SIZE]: (state, action) => {
			const { width, height } = action.payload
			return state.set(
				"windowSize",
				fromJS({
					width,
					height,
				})
			)
		},
	},
	initialState
)
