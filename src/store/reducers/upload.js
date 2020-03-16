import produce from 'immer';
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
const initialState = {
  step: 0,
  groupSelected: false,
  imagesSelected: false,
  submitted: false,
  images: [],
  info: {
    title: '',
    description: '',
    hasSchedule: false,
    schedules: [defaultSchedule],
    category: ZABO_CATEGORIES.map (tag => ({ name: tag, clicked: false })),
  },
  edit: {},
  showModal: false,
};

// reducer
export default handleActions (
  {
    [INITIALIZE]: (state, action) => produce (state, draft => {
      Object.assign (draft, action.payload);
    }),
    [SET_STEP]: (state, action) => produce (state, draft => {
      draft.step = action.payload;
    }),
    [SET_GROUP_SELECTED]: (state, action) => produce (state, draft => {
      draft.groupSelected = action.payload;
    }),
    [SET_IMAGES_SELECTED]: (state, action) => produce (state, draft => {
      draft.imagesSelected = action.payload;
    }),
    [SUBMIT]: (state, action) => produce (state, draft => {
      draft.submitted = action.payload;
    }),
    [SET_IMAGES]: (state, action) => produce (state, draft => {
      draft.images = action.payload;
    }),
    [SET_INFO]: (state, action) => produce (state, draft => {
      draft.info = action.payload;
    }),
    [SET_MODAL]: (state, action) => produce (state, draft => {
      draft.showModal = action.payload;
    }),
    [RESET]: () => {
      storage.removeItem ('uploadPersist');
      return initialState;
    },
  },
  initialState,
);
