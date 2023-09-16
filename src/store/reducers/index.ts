import { combineReducers } from "redux";
import { penderReducer } from "redux-pender";
// import immutableTransform from 'redux-persist-transform-immutable';
// import storage from 'redux-persist/lib/storage';
// import { persistReducer } from 'redux-persist';

import admin from "./admin";
import app from "./app";
import auth from "./auth";
import profile from "./profile";
import upload from "./upload";
import zabo from "./zabo";

const modules = {
  admin,
  app,
  auth,
  profile,
  upload,
  zabo,
  pender: penderReducer,
};

// const persistConfig = {
//  transforms: [immutableTransform ({
//    blacklist: ['groupSelected', 'imagesSelected', 'infoWritten'],
//  })],
//  key: 'upload',
//  storage,
// };
//
// modules.upload = persistReducer (persistConfig, modules.upload);

export default combineReducers(modules);
