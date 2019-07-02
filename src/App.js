import React from "react"

import { Switch, Route, Redirect } from "react-router-dom"

import Header from "templates/Header"
import { HomePage, MainPage, ZaboUploadPage, MyPage, AuthPage } from "components/pages"
import AuthCallback from "organisms/AuthCallback"

import AppWrapper from "./App.styled"

import { PrivateRoute, PublicRoute } from "./hoc/AuthRoutes"

function App() {
	return (
		<AppWrapper>
			<Route path="/:route?" component={Header} />
			<Route path="/" exact component={AuthCallback} />
			<Switch>
				<Route path="/" exact component={HomePage} />
				<PublicRoute path="/auth" component={AuthPage} />
				<Route path="/main" component={MainPage} />
				<Route path="/zabo/upload" component={ZaboUploadPage} />
				<PrivateRoute path="/my-page" component={MyPage} />
			</Switch>
		</AppWrapper>
	)
}

export default App;
