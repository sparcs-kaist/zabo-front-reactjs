import { createAction, handleActions } from "redux-actions"
import { Map, fromJS } from "immutable"
import { pender } from "redux-pender"

import { loadGroupInfo } from "../../lib/api/groups.js"

// Action types
const LOAD_GROUP_INFO = 'user/LOAD_GROUP_INFO'

// Action creator
export const load_saveposter = createAction(LOAD_GROUP_INFO,loadGroupInfo);

const initialState = Map({
  group: Map({}),
});

export default handleActions({
  ...pender({
    type: LOAD_GROUP_INFO,
    onSuccess: (state, action) => {
      const { group } = action.payload;
      console.log(fromJS(group));
      return state
    }
  })
}, initialState)
