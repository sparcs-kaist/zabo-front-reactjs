import { createAction, handleActions } from 'redux-actions';
import { fromJS, Map } from 'immutable';

// action types
const SET_GROUP_SELECTED = 'upload/SET_GROUP_SELECTED';
const SET_IMAGES_SELECTED = 'upload/SET_IMAGES_SELECTED';
const SET_IMAGES = 'upload/SET_IMAGES';
const SET_INFO = 'upload/SET_INFO';
const RESET = 'upload/RESET';

// action creators
export const setGroupSelected = createAction (SET_GROUP_SELECTED);
export const setImagesSeletec = createAction (SET_IMAGES_SELECTED);
export const setImages = createAction (SET_IMAGES);
export const setInfo = createAction (SET_INFO);
export const reset = createAction (RESET);

// initial state
const initialState = Map ({
  groupSelected: false,
  imagesSelected: false,
  images: [],
  info: {
    title: '',
    desc: '',
    expDate: '',
    keyword: [''],
  },
});

// reducer
export default handleActions (
  {
    [SET_GROUP_SELECTED]: (state, action) => {
      const groupSelected = action.payload;
      return state.set ('groupSelected', groupSelected);
    },
    [SET_IMAGES_SELECTED]: (state, action) => state.set ('imagesSelected', action.payload),
    [SET_IMAGES]: (state, action) => {
      const images = action.payload;
      return state.set ('images', fromJS (images));
    },
    [SET_INFO]: (state, action) => {
      const info = action.payload;
      return state.set ('info', fromJS (info));
    },
    [RESET]: () => initialState,
  },
  initialState,
);
