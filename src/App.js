import React from "react"

import { Switch, Route } from "react-router-dom"

import Header from "templates/Header"
import { HomePage, MainPage } from "components/pages"

import AppWrapper from "./App.styled"

function App() {
	return (
		<AppWrapper>
			<Route path="/:route?" component={Header} />
			<Switch>
				<Route path="/home" component={HomePage} />
				<Route path="/main" component={MainPage} />
			</Switch>
		</AppWrapper>
	)
}

export default App