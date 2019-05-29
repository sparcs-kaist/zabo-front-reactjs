import React from "react"

import { Switch, Route } from "react-router-dom"

import Header from "templates/Header"
import { HomePage, MainPage, ZaboPage } from "components/pages"
import TodoList from "templates/TodoList"

import AppWrapper from "./App.styled"

function App() {
	return (
		<AppWrapper>
			<Route path="/:route?" component={Header} />
			<Switch>
				<Route path="/home" component={HomePage} />
				<Route path="/main" component={MainPage} />
				<Route path="/todo" component={TodoList} />
				<Route path="/upload" component={ZaboPage} />
			</Switch>
		</AppWrapper>
	)
}

export default App
