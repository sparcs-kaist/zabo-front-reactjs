import { applyMiddleware, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import penderMiddleware from "redux-pender"
import { Map } from "immutable"

import rootReducer from "./reducers"

const composeEnhancers = composeWithDevTools({
	actionBlacklist: ["@@redux-pender/SUCCESS", "@@redux-pender/FAILURE", "@@redux-pender/PENDING"],
	maxAge: 1000,
})

const store = createStore(
	rootReducer,
	Map(), // Initial state
	composeEnhancers(applyMiddleware(penderMiddleware()))
)

if (rootReducer.hot) {
	rootReducer.hot.accept("./reducers", () => {
		const nextRootReducer = require("./reducers").default
		store.replaceReducer(nextRootReducer)
	})
}

export default store
