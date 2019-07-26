import { createAction, handleActions } from "redux-actions"
import { Map, List, fromJS } from "immutable"
import { pender } from "redux-pender"

import * as ZaboAPI from "../../lib/api/zabo"

/*
 * Reducer: 이 파일은 리듀서 '함수', action creator - dispatch(action) 이 들어오면 action 을 처리한다.
 *          State 와 Action 을 받아서 새로운 State 를 렌더링.
 *
 * 밖의 index.js 에서 이 reducer 함수를 createStore 에 넣어서 전체 STORE 를 만듦.
 */

// Action types
const GET_ZABO_LIST = 'zabo/GET_ZABO_LIST'
const UPLOAD_ZABO = 'zabo/UPLOAD_ZABO'

// Action creator : action 객체를 만들어주는 함수
//   ㄴ 왜 함수? 그때 그때 보낼 사진, 제목, 설명 등이 다르니까!
export const uploadZabo = createAction(UPLOAD_ZABO, ZaboAPI.uploadZabo, meta => meta)
export const getZaboList = createAction(GET_ZABO_LIST, ZaboAPI.getZaboList)

// 초기값 설정
const initialState = Map({
	zaboList: List([])
})

// Reducer 함수 : state, action 을 받아 다음 상태를 만들어서 반환.
export default handleActions({
	...pender({
		type: UPLOAD_ZABO,
		onSuccess: (state, action) => {
			return state
		},
	}),
	...pender({
		type: GET_ZABO_LIST,
		onSuccess: (state, action) => {
			const newZaboList = action.payload
			// filter no longer needed, if all zabo MUST acquire photos
			const zaboWithPhotos = newZaboList.filter(item => item.photos[0] !== undefined)
			return state.update("zaboList", prevList => {
				return prevList.merge(fromJS(zaboWithPhotos))
			})
		}
	})
}, initialState)
