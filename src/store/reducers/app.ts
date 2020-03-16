import produce from 'immer';
import { Action, createAction, handleActions } from 'redux-actions';

// action types
const UPDATE_WINDOW_SIZE = 'app/UPDATE_WINDOW_SIZE';

// action creators
export const setWindowSize = createAction (UPDATE_WINDOW_SIZE);

interface IWindowSize {
  width : number;
  height : number;
}
export interface IAppState {
  windowSize : IWindowSize;
}

// initial state
const initialState : IAppState = {
  windowSize: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
};

// reducer
export default handleActions (
  {
    [UPDATE_WINDOW_SIZE]: (state, action : Action<IWindowSize>) => produce (state, (draft : IAppState) => {
      draft.windowSize = action.payload;
    }),
  },
  initialState,
);
