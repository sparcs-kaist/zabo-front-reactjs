import { createAction, handleActions } from "redux-actions"
import { Map, fromJS } from "immutable"
import { pender } from "redux-pender"

import { loadZaboAPI } from "../../lib/api/zabo.js"

// Action types
const LOAD_SAVEZABO = 'user/LOAD_SAVEPOSTER'

// Action creator
export const load_saveposter = createAction(LOAD_SAVEZABO,loadZaboAPI);

const initialState = Map({
  savePoster: Map({}),
});

export default handleActions({
  ...pender({
    type: LOAD_SAVEZABO,
    onSuccess: (state, action) => {
      const { zabo } = action.payload;
      return state
    }
  })
}, initialState)
