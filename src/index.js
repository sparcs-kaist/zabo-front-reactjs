import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { Provider } from "react-redux"
import { ThemeProvider } from "styled-components"

import "./index.scss"

import store from "./store"

import App from "./App"

import boot from "./boot"

import * as serviceWorker from "./serviceWorker"

boot()

ReactDOM.render(
	<Provider store={store}>
		<ThemeProvider theme={{ mode: "light" }}>
			<Router>
				<App />
			</Router>
		</ThemeProvider>
	</Provider>,
	document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
