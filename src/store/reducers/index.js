import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';
// import immutableTransform from 'redux-persist-transform-immutable';
// import storage from 'redux-persist/lib/storage';
// import { persistReducer } from 'redux-persist';

// import all files except index.js
const req = require.context ('.', true, /^(?!.\/index).*.js$/);

const modules = {};

req.keys ().forEach (key => {
  const regex = /.\/(.*?).js$/;
  const moduleName = regex.test (key) && key.match (regex)[1];
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
