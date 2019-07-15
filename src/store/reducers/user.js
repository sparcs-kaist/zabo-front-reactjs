import { createAction, handleActions } from "redux-actions"
import { Map, fromJS } from "immutable"
import { pender } from "redux-pender"

import { set_CurrentGroup } from "../../lib/api/user.js"

// Action types
const SET_CURRENT_GROUP = 'user/SET_CURRENT_GROUP'

// Action creator
export const setCurrentGroup = createAction(SET_CURRENT_GROUP,set_CurrentGroup);

const initialState = Map({
  savePoster: Map({}),
  currentGroup: Map({}),
});

export default handleActions({
  ...pender({
    type: SET_CURRENT_GROUP,
    onSuccess: (state, action) => {
      const { currentGroup } = action.payload;
      return state.set('currentGroup', fromJS(currentGroup))
    },
  })
}, initialState)
