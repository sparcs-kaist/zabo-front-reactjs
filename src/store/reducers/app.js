import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';

// action types
const UPDATE_WINDOW_SIZE = 'app/UPDATE_WINDOW_SIZE';

// action creators
export const setWindowSize = createAction (UPDATE_WINDOW_SIZE);

// initial state
const initialState = {
  windowSize: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
};

// reducer
export default handleActions (
  {
    [UPDATE_WINDOW_SIZE]: (state, action) => produce (state, draft => {
      draft.windowSize = action.payload;
    }),
  },
  initialState,
);
