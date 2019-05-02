const createStore = (reducer) => {
	let state
	let listeners = []
	const getState = () => state
	const dispatch = (action) => {
		state = reducer(state, action)
		listeners.forEach(listener => listener(state))
	}
	const subscribe = (listener) => {
		listeners.push(listener)
		return () => {
			listeners = listeners.filter(l => l !== listener)
		}
	}
	dispatch({})
	return {
		getState, dispatch, subscribe,
	}
}

const reducer = (state = { /* Prev State */ }, action) => {
	return {
		// New State
	}
}


/*
{
	todos: []
}

ADD_TODO : 아이템을 추가
DELETE_TODO : 아이템을 삭제
UPDATE_TODO : 아이템을 업데이트


*/
