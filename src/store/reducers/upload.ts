import produce from 'immer';
import { Action, createAction, handleActions } from 'redux-actions';

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

export interface ISchedule {
  title : string;
  startAt : Date
  eventType : string;
}

export interface IUploadState {
  step : number,
  groupSelected : boolean,
  imagesSelected : boolean,
  submitted : boolean,
  images : any[],
  info : {
    title : string,
    description : string,
    hasSchedule : boolean,
    schedules : ISchedule[],
    category : { name : string, clicked : boolean }[],
  },
  showModal : boolean,
}

export const defaultSchedule : ISchedule = {
  title: '',
  startAt: date,
  eventType: '행사',
};

// initial state
const initialState : IUploadState = {
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
  showModal: false,
};

// reducer
export default handleActions (
  {
    [INITIALIZE]: (state, action) => produce (state, (draft : IUploadState) => {
      Object.assign (draft, action.payload);
    }),
    [SET_STEP]: (state, action : Action<any>) => produce (state, (draft : IUploadState) => {
      draft.step = action.payload;
    }),
    [SET_GROUP_SELECTED]: (state, action : Action<any>) => produce (state, (draft : IUploadState) => {
      draft.groupSelected = action.payload;
    }),
    [SET_IMAGES_SELECTED]: (state, action : Action<any>) => produce (state, (draft : IUploadState) => {
      draft.imagesSelected = action.payload;
    }),
    [SUBMIT]: (state, action : Action<any>) => produce (state, (draft : IUploadState) => {
      draft.submitted = action.payload;
    }),
    [SET_IMAGES]: (state, action : Action<any>) => produce (state, (draft : IUploadState) => {
      draft.images = action.payload;
    }),
    [SET_INFO]: (state, action : Action<any>) => produce (state, (draft : IUploadState) => {
      draft.info = action.payload;
    }),
    [SET_MODAL]: (state, action : Action<any>) => produce (state, (draft : IUploadState) => {
      draft.showModal = action.payload;
    }),
    [RESET]: () => {
      storage.removeItem ('uploadPersist');
      return initialState;
    },
  },
  initialState,
);
