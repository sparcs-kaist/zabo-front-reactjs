import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import penderMiddleware from "redux-pender";

import persist from "./persist";
import rootReducer from "./reducers";

const composeEnhancers = composeWithDevTools({
  actionBlacklist: ["@@redux-pender/SUCCESS", "@@redux-pender/FAILURE", "@@redux-pender/PENDING"],
  maxAge: 1000,
});

const store = createStore(
  rootReducer,
  {}, // Initial state
  composeEnhancers(applyMiddleware(penderMiddleware(), persist)),
);

if (rootReducer.hot) {
  rootReducer.hot.accept("./reducers", () => {
    const nextRootReducer = import("./reducers");
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
