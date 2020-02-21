import { fromJS, List, Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';

import storage from 'lib/storage';
import { ZABO_CATEGORIES } from 'lib/variables';

// action types
const INITIALIZE = 'upload/INITIALIZE';
const SET_STEP = 'upload/SET_STEP';
const SET_GROUP_SELECTED = 'upload/SET_GROUP_SELECTED';
const SET_IMAGES_SELECTED = 'upload/SET_IMAGES_SELECTED';
const SET_IMAGES = 'upload/SET_IMAGES';
const SET_INFO = 'upload/SET_INFO';
const RESET = 'upload/RESET';
const SET_MODAL = 'upload/SET_MODAL';
const SUBMIT = 'upload/SUBMIT';

// action creators
export const initialize = createAction (INITIALIZE);
export const setStep = createAction (SET_STEP);
export const setGroupSelected = createAction (SET_GROUP_SELECTED);
export const setImagesSeleted = createAction (SET_IMAGES_SELECTED);
export const setImages = createAction (SET_IMAGES);
export const setInfo = createAction (SET_INFO);
export const reset = createAction (RESET);
export const setModal = createAction (SET_MODAL);
export const submit = createAction (SUBMIT);

const date = new Date ();
date.setDate (date.getDate () + 7);
date.setHours (0);
date.setMinutes (0);
date.setSeconds (0);
export const defaultSchedule = {
  title: '',
  startAt: date,
  eventType: '행사',
};

// initial state
const initialState = Map ({
  step: 0,
  groupSelected: false,
  imagesSelected: false,
  submitted: false,
  images: List ([]),
  info: Map ({
    title: '',
    description: '',
    hasSchedule: false,
    schedules: List ([
      Map (defaultSchedule),
    ]),
    category: List (ZABO_CATEGORIES.map (tag => ({ name: tag, clicked: false }))),
  }),
  edit: Map ({}),
  showModal: false,
});

// reducer
export default handleActions (
  {
    [INITIALIZE]: (state, action) => state.merge (
      action.payload,
    ),
    [SET_STEP]: (state, action) => state.set ('step', action.payload),
    [SET_GROUP_SELECTED]: (state, action) => {
      const groupSelected = action.payload;
      return state.set ('groupSelected', groupSelected);
    },
    [SET_IMAGES_SELECTED]: (state, action) => state.set ('imagesSelected', action.payload),
    [SUBMIT]: (state, action) => state.set ('submitted', action.payload),
    [SET_IMAGES]: (state, action) => {
      const images = action.payload;
      return state.set ('images', fromJS (images));
    },
    [SET_INFO]: (state, action) => {
      const info = action.payload;
      return state.set ('info', fromJS (info));
    },
    [SET_MODAL]: (state, action) => state.set ('showModal', action.payload),
    [RESET]: () => {
      storage.removeItem ('uploadPersist');
      return initialState;
    },
  },
  initialState,
);
