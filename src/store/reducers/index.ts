import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { penderReducer } from 'redux-pender';
// import immutableTransform from 'redux-persist-transform-immutable';
// import storage from 'redux-persist/lib/storage';
// import { persistReducer } from 'redux-persist';

// import all files except index.js
const req = require.context ('.', true, /^(?!.\/index).*.js$/);

const modules : {
  [key : string] : ReturnType<typeof handleActions> | typeof penderReducer
} = {};

req.keys ().forEach ((key) => {
  const regex = /.\/(.*?).ts$/;
  const moduleName = regex.test (key) && (key.match (regex) || [])[1];
  if (!moduleName) return;
  modules[moduleName] = req (key).default;
});

modules.pender = penderReducer;


// const persistConfig = {
//  transforms: [immutableTransform ({
//    blacklist: ['groupSelected', 'imagesSelected', 'infoWritten'],
//  })],
//  key: 'upload',
//  storage,
// };
//
// modules.upload = persistReducer (persistConfig, modules.upload);

export default combineReducers (modules);
