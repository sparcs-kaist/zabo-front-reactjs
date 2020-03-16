import produce from 'immer';
import get from 'lodash.get';
import set from 'lodash.set';
import uniq from 'lodash.uniq';
import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';

import * as SearchAPI from 'lib/api/search';
import * as ZaboAPI from 'lib/api/zabo';

// Action types
const GET_HOT_ZABO_LIST = 'zabo/GET_HOT_ZABO_LIST';
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
const DELETE_ZABO = 'zabo/DELETE_ZABO';

// Action creator : action 객체를 만들어주는 함수
export const getHotZaboList = createAction (GET_HOT_ZABO_LIST, ZaboAPI.getHotZaboList);
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
export const deleteZabo = createAction (DELETE_ZABO, ZaboAPI.deleteZabo, meta => meta);

// 초기값 설정
const initialState = {
  lists: {
    // Using group name as a key, keys in this map should be RESERVED as name in server side
    pins: [],
    main: [],
    search: [],
  },
  zabos: {},
};


// Reducer 함수 : state, action 을 받아 다음 상태를 만들어서 반환.
export default handleActions (
  {
    ...pender ({
      type: UPLOAD_ZABO,
      onSuccess: (state, action) => {
        const zabo = action.payload;
        return produce (state, draft => {
          set (draft, ['zabos', zabo._id], zabo);
        });
      },
    }),
    ...pender ({
      type: PATCH_ZABO,
      onSuccess: (state, action) => {
        const { zaboId } = action.meta;
        return produce (state, draft => {
          Object.assign (draft.zabos[zaboId], action.payload);
        });
      },
    }),
    ...pender ({
      type: DELETE_ZABO,
      onSuccess: (state, action) => state,
    }),
    ...pender ({
      type: GET_ZABO,
      onSuccess: (state, action) => {
        const zabo = action.payload;
        return produce (state, draft => {
          set (draft, ['zabos', zabo._id], zabo);
        });
      },
      onFailure: (state, action) => {
        const error = action.payload;
        const zaboId = action.meta;
        return produce (state, draft => {
          set (draft, ['zabos', zaboId], error);
        });
      },
    }),
    ...pender ({
      type: GET_HOT_ZABO_LIST,
      onSuccess: (state, action) => {
        const zaboList = action.payload;

        const zaboMap = zaboList.reduce ((acc, cur) => ({ ...acc, [cur._id]: cur }), {});
        const zaboIds = zaboList.map (zabo => zabo._id);
        return produce (state, draft => {
          Object.assign (draft.zabos, zaboMap);
          set (draft, ['lists', 'hot'], zaboIds);
        });
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

        return produce (state, draft => {
          const prevIdList = get (draft, ['lists', key], []);
          const newIdList = lastSeen ? [...prevIdList, ...zaboIds] : [...zaboIds, ...prevIdList];
          set (draft, ['lists', key], uniq (newIdList));
          Object.assign (draft.zabos, zaboMap);
        });
      },
    }),
    ...pender ({
      type: GET_PINS,
      onSuccess: (state, action) => {
        const pins = action.payload;
        const { lastSeen } = action.meta;

        const zaboMap = pins.reduce ((acc, cur) => ({ ...acc, [cur._id]: cur }), {});
        const zaboIds = pins.map (pin => pin._id);

        return produce (state, draft => {
          const prevIdList = get (draft, ['lists', 'pins'], []);
          const newIdList = lastSeen ? [...prevIdList, ...zaboIds] : [...zaboIds, ...prevIdList];
          set (draft, ['lists', 'pins'], uniq (newIdList));
          Object.assign (draft.zabos, zaboMap);
        });
      },
    }),
    ...pender ({
      type: TOGGLE_ZABO_PIN,
      onSuccess: (state, action) => produce (state, draft => {
        Object.assign (draft.zabos[action.meta], action.payload);
      }),
    }),
    ...pender ({
      type: TOGGLE_ZABO_LIKE,
      onSuccess: (state, action) => produce (state, draft => {
        Object.assign (draft.zabos[action.meta], action.payload);
      }),
    }),
    ...pender ({
      type: GET_GROUP_ZABO_LIST,
      onSuccess: (state, action) => {
        const zabos = action.payload;
        const { groupName, lastSeen } = action.meta;
        const zaboMap = zabos.reduce ((acc, cur) => ({ ...acc, [cur._id]: cur }), {});
        const zaboIds = zabos.map (zabo => zabo._id);
        return produce (state, draft => {
          const prevIdList = get (draft, ['lists', groupName], []);
          const newIdList = lastSeen ? [...prevIdList, ...zaboIds] : [...zaboIds, ...prevIdList];
          set (draft, ['lists', groupName], uniq (newIdList));
          Object.assign (draft.zabos, zaboMap);
        });
      },
    }),
    ...pender ({
      type: GET_SEARCH_ZABO_LIST,
      onSuccess: (state, action) => {
        const zabos = action.payload;
        const { lastSeen, text } = action.meta;
        const zaboMap = zabos.reduce ((acc, cur) => ({ ...acc, [cur._id]: cur }), {});
        const zaboIds = zabos.map (zabo => zabo._id);

        return produce (state, draft => {
          const prevIdList = get (draft, ['lists', 'search'], []);
          const newIdList = lastSeen ? [...prevIdList, ...zaboIds] : zaboIds;
          set (draft, ['lists', 'search'], uniq (newIdList));
          Object.assign (draft.zabos, zaboMap);
        });
      },
    }),
    ...pender ({
      type: GET_SEARCH,
      onSuccess: (state, action) => {
        const data = action.payload;
        const { zabos } = data;
        const zaboMap = zabos.reduce ((acc, cur) => ({ ...acc, [cur._id]: cur }), {});
        const zaboIds = zabos.map (zabo => zabo._id);
        return produce (state, draft => {
          set (draft, ['lists', 'search'], zaboIds);
          Object.assign (draft.zabos, zaboMap);
        });
      },
    }),
  },
  initialState,
);
