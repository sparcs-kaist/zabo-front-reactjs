import { createAction, handleActions } from "redux-actions";
import { Map } from "immutable";
import { pender } from "redux-pender";

import * as ZaboAPI from "../../lib/api/zabo"

// Action types
const UPLOAD_ZABO = 'zabo/UPLOAD_ZABO';

// Action creator : 액션 객체를 만들어주는 액션 함수
//   ㄴ 리듀서에 전달해 줄 액션 객체를 만든다. 왜 함수? 그때 그때 보낼 사진, 제목, 설명 등이 다르니까!
export const uploadZabo = createAction(UPLOAD_ZABO, ZaboAPI.uploadZabo);

// 초기값 설정
const initialState = Map({

});

// Reducer 함수 : state, action 을 받아 다음 상태를 만들어서 반환.
export default handleActions({
  ...pender({
    type: UPLOAD_ZABO,
    onSuccess: (state, action) => {
      // const { zabo } = action.payload;
      console.log("Zabo successfully uploaded?");
      return state;
    }
  }),
}, initialState);
