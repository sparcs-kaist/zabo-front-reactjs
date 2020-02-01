import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';

import * as ZaboAPI from '../../lib/api/zabo';

// Action types
const GET_ZABO_LIST = 'zabo/GET_ZABO_LIST';
const UPLOAD_ZABO = 'zabo/UPLOAD_ZABO';
const GET_ZABO = 'zabo/GET_ZABO';
const GET_PINS = 'zabo/GET_PINS';
const TOGGLE_ZABO_PIN = 'zabo/TOGGLE_ZABO_PIN';
const TOGGLE_ZABO_LIKE = 'zabo/TOGGLE_ZABO_LIKE';

// Action creator : action 객체를 만들어주는 함수
export const uploadZabo = createAction (UPLOAD_ZABO, ZaboAPI.uploadZabo, meta => meta);
export const getZaboList = createAction (GET_ZABO_LIST, ZaboAPI.getZaboList, meta => meta);
export const getZabo = createAction (GET_ZABO, ZaboAPI.getZabo, meta => meta);
export const getPins = createAction (GET_PINS, ZaboAPI.getPins, meta => meta);
export const toggleZaboPin = createAction (TOGGLE_ZABO_PIN, ZaboAPI.toggleZaboPin, meta => meta);
export const toggleZaboLike = createAction (TOGGLE_ZABO_LIKE, ZaboAPI.toggleZaboLike, meta => meta);

// 초기값 설정
const initialState = Map ({
  lists: Map ({
    pins: List ([]),
    main: List ([]),
  }),
  zabos: Map ({}),
});

// Reducer 함수 : state, action 을 받아 다음 상태를 만들어서 반환.
export default handleActions (
  {
    ...pender ({
      type: UPLOAD_ZABO,
      onSuccess: (state, action) => state,
    }),
    ...pender ({
      type: GET_ZABO,
      onSuccess: (state, action) => {
        const zabo = action.payload;
        return state.setIn (['zabos', zabo._id], fromJS (zabo));
      },
    }),
    ...pender ({
      type: GET_ZABO_LIST,
      onSuccess: (state, action) => {
        const zaboList = action.payload;
        const { lastSeen, relatedTo } = action.meta;
        const key = relatedTo || 'main';

        const zaboMap = zaboList.reduce ((acc, cur) => ({ ...acc, [cur._id]: cur }), {});
        const zaboIds = zaboList.map (zabo => zabo._id);

        if (!lastSeen) {
          return state
            .update ('zabos', zabos => zabos.merge (fromJS (zaboMap)))
            .setIn (['lists', key], fromJS (zaboIds));
        }
        return state
          .update ('zabos', zabos => zabos.merge (fromJS (zaboMap)))
          .updateIn (['lists', key], prevList => prevList.merge (fromJS (zaboIds)));
      },
    }),
    ...pender ({
      type: GET_PINS,
      onSuccess: (state, action) => {
        const pins = action.payload;
        const { lastSeen } = action.meta;

        const zaboMap = pins.reduce ((acc, cur) => ({ ...acc, [cur._id]: cur }), {});
        const zaboIds = pins.map (pin => pin._id);

        if (!lastSeen) {
          return state
            .update ('zabos', zabos => zabos.merge (fromJS (zaboMap)))
            .setIn (['lists', 'pins'], fromJS (zaboIds));
        }
        return state
          .update ('zabos', zabos => zabos.merge (fromJS (zaboMap)))
          .updateIn (['lists', 'pins'], prevList => prevList.merge (fromJS (zaboIds)));
      },
    }),
    ...pender ({
      type: TOGGLE_ZABO_PIN,
      onSuccess: (state, action) => state.updateIn (['zabos', action.meta], zabo => zabo.merge (fromJS (action.payload))),
    }),
    ...pender ({
      type: TOGGLE_ZABO_LIKE,
      onSuccess: (state, action) => state.updateIn (['zabos', action.meta], zabo => zabo.merge (fromJS (action.payload))),
    }),

  },
  initialState,
);
