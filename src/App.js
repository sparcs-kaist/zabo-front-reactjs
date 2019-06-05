import React from "react"

import { Switch, Route } from "react-router-dom"

import Header from "templates/Header"
import { HomePage, MainPage, ZaboUploadPage, MyPage } from "components/pages"
import AuthCallback from "organisms/AuthCallback"

import AppWrapper from "./App.styled"

function App() {
	return (
		<AppWrapper>
			<Route path="/:route?" component={Header} />
			<Route path="/" exact component={AuthCallback} />
			<Switch>
				<Route path="/" exact component={HomePage} />
				<Route path="/main" component={MainPage} />
				<Route path="/zabo/upload" component={ZaboUploadPage} />
				<Route path="/my-page" component={MyPage} />
			</Switch>
		</AppWrapper>
	)
}

export default App;
