import { penderReducer } from "redux-pender"
import { combineReducers } from "redux";

// import all files except index.js
const req = require.context(".", true, /^(?!.\/index).*.js$/)

const modules = {}

req.keys().forEach(key => {
    const regex = /.\/(.*?).js$/
    const moduleName = regex.test(key) && key.match(regex)[1]
    modules[moduleName] = req(key).default
})

modules["pender"] = penderReducer

export default combineReducers(modules)