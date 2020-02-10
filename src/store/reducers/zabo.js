import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';
import uniq from 'lodash.uniq';

import * as ZaboAPI from '../../lib/api/zabo';
import * as SearchAPI from '../../lib/api/search';

// Action types
const GET_ZABO_LIST = 'zabo/GET_ZABO_LIST';
const UPLOAD_ZABO = 'zabo/UPLOAD_ZABO';
const PATCH_ZABO = 'zabo/PATCH_ZABO';
const GET_ZABO = 'zabo/GET_ZABO';
const GET_PINS = 'zabo/GET_PINS';
const TOGGLE_ZABO_PIN = 'zabo/TOGGLE_ZABO_PIN';
const TOGGLE_ZABO_LIKE = 'zabo/TOGGLE_ZABO_LIKE';
const GET_GROUP_ZABO_LIST = 'zabo/GET_GROUP_ZABO_LIST';
const GET_SEARCH_ZABO_LIST = 'zabo/GET_SEARCH_ZABO_LIST';
const GET_SEARCH = 'zabo/GET_SEARCH';

// Action creator : action 객체를 만들어주는 함수
export const uploadZabo = createAction (UPLOAD_ZABO, ZaboAPI.uploadZabo, meta => meta);
export const patchZabo = createAction (PATCH_ZABO, ZaboAPI.patchZabo, meta => meta);
export const getZaboList = createAction (GET_ZABO_LIST, ZaboAPI.getZaboList, meta => meta);
export const getZabo = createAction (GET_ZABO, ZaboAPI.getZabo, meta => meta);
export const getPins = createAction (GET_PINS, ZaboAPI.getPins, meta => meta);
export const toggleZaboPin = createAction (TOGGLE_ZABO_PIN, ZaboAPI.toggleZaboPin, meta => meta);
export const toggleZaboLike = createAction (TOGGLE_ZABO_LIKE, ZaboAPI.toggleZaboLike, meta => meta);
export const getGroupZaboList = createAction (GET_GROUP_ZABO_LIST, ZaboAPI.getGroupZaboList, meta => meta);
export const getSearchZaboList = createAction (GET_SEARCH_ZABO_LIST, ZaboAPI.getSearchZaboList, meta => meta);
export const getSearch = createAction (GET_SEARCH, SearchAPI.searchAPI, meta => meta);

// 초기값 설정
const initialState = Map ({
  lists: Map ({
    // Using group name as a key, keys in this map should be RESERVED as name in server side
    pins: List ([]),
    main: List ([]),
    search: List ([]),
  }),
  zabos: Map ({}),
});

// Reducer 함수 : state, action 을 받아 다음 상태를 만들어서 반환.
export default handleActions (
  {
    ...pender ({
      type: UPLOAD_ZABO,
      onSuccess: (state, action) => {
        const zabo = action.payload;
        return state.setIn (['zabos', zabo._id], fromJS (zabo));
      },
    }),
    ...pender ({
      type: PATCH_ZABO,
      onSuccess: (state, action) => {
        const { zaboId } = action.meta;
        return state.updateIn (['zabos', zaboId], prev => prev.merge (fromJS (action.payload)));
      },
    }),
    ...pender ({
      type: GET_ZABO,
      onSuccess: (state, action) => {
        const zabo = action.payload;
        return state.setIn (['zabos', zabo._id], fromJS (zabo));
      },
      onFailure: (state, action) => {
        const error = action.payload;
        const zaboId = action.meta;
        return state.setIn (['zabos', zaboId], fromJS (error));
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
            .updateIn (['lists', key], prevList => fromJS (uniq ([...zaboIds, ...(prevList ? prevList.toJS () : [])])))
            .update ('zabos', zabos => zabos.merge (fromJS (zaboMap)));
        }
        return state
          .update ('zabos', zabos => zabos.merge (fromJS (zaboMap)))
          .updateIn (['lists', key], prevList => fromJS (uniq ([...(prevList ? prevList.toJS () : []), ...zaboIds])));
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
    ...pender ({
      type: GET_GROUP_ZABO_LIST,
      onSuccess: (state, action) => {
        const zabos = action.payload;
        const { groupName } = action.meta;
        const zaboMap = zabos.reduce ((acc, cur) => ({ ...acc, [cur._id]: cur }), {});
        const zaboIds = zabos.map (zabo => zabo._id);
        return state
          .update ('zabos', zabos => zabos.merge (fromJS (zaboMap)))
          .setIn (['lists', groupName], fromJS (zaboIds));
      },
    }),
    ...pender ({
      type: GET_SEARCH_ZABO_LIST,
      onSuccess: (state, action) => {
        const zabos = action.payload;
        const { lastSeen, text } = action.meta;
        const zaboMap = zabos.reduce ((acc, cur) => ({ ...acc, [cur._id]: cur }), {});
        const zaboIds = zabos.map (zabo => zabo._id);

        // !lastSeen case don't need -> check this case when zaboList fetch
        if (!lastSeen) {
          return state
            .update ('zabos', zabos => zabos.merge (fromJS (zaboMap)))
            .setIn (['lists', 'search'], fromJS (zaboIds));
        }
        return state
          .update ('zabos', zabos => zabos.merge (fromJS (zaboMap)))
          .updateIn (['lists', 'search'], prevList => prevList.merge (fromJS (zaboIds)));
      },
    }),
    ...pender ({
      type: GET_SEARCH,
      onSuccess: (state, action) => {
        const data = action.payload;
        const { zabos } = data;
        const zaboMap = zabos.reduce ((acc, cur) => ({ ...acc, [cur._id]: cur }), {});
        const zaboIds = zabos.map (zabo => zabo._id);
        return state
          .update ('zabos', zabos => zabos.merge (fromJS (zaboMap)))
          .setIn (['lists', 'search'], fromJS (zaboIds));
      },
    }),
  },
  initialState,
);
