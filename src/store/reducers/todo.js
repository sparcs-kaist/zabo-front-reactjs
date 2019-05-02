import { createAction, handleActions } from "redux-actions"
import { pender } from "redux-pender"
import get from "lodash.get"

let nextId = 3

// action types
const ADD_TODO = "todo/ADD_TODO"
const TOGGLE_TODO = "todo/TOGGLE_TODO"

//action creators
export const addTodo = createAction(
	ADD_TODO, (text) => {
		return {
			id: nextId++,
			text,
			completed: false
		}
	})

export const toggleTodo =  createAction(
	TOGGLE_TODO,
	x => x
)

// initial state
const initialState = {
	todos: [{
		id: 0,
		text: 'First todo',
		completed: false
	},
		{
			id: 1,
			text: 'Second todo',
			completed: false
		},
		{
			id: 2,
			text: 'Third todo',
			completed: false
		}]
}

// reducer
export default handleActions({
	[ADD_TODO]: (state, action) => {
		const todo = action.payload
		return {
			...state,
			todos: [
				...state.todos,
				todo
			]
		}
	},
	[TOGGLE_TODO]: (state, action) => {
		const id = action.payload
		return {
			...state,
			todos: state.todos.map(todo => ({
				...todo,
				completed: todo.id === id ? !todo.completed : todo.completed
			}))
		}
		//const index = state.todos.findIndex(todo => todo.id === id)
		//if (index !== -1) {
		//	const todos = state.todos
		//	todos[index].completed = !todos[index].completed
		//}
		//return state
	}
}, initialState)
