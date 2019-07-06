import { createAction, handleActions } from "redux-actions";
import { Map, fromJS } from "immutable";
import { pender } from "redux-pender";

import * as ZaboAPI from "../../lib/api/zabo"

// Action types
const UPLOAD_ZABO = '~~';

// Action creator
export const uploadZabo = createAction(UPLOAD_ZABO, ZaboAPI.uploadZabo);

const initialState = Map({

});

export default handleActions({
  ...pender({
    type: UPLOAD_ZABO,
    onSuccess: (state, action) => {

    }
  }),
}, initialState);
