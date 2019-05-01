import React from "react"

import { Switch, Route } from "react-router-dom"

import Header from "templates/Header"
// import { HomePage } from "./components/pages"
import { HomePage } from "components/pages"

import AppWrapper from "./App.styled"

function App() {
	return (
		<AppWrapper>
			<Route path="/:route?" component={Header} />
			<Switch>
				<Route path="/home" component={HomePage} />
			</Switch>
		</AppWrapper>
	)
}

export default App