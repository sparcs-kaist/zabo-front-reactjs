import React from "react"

import { Switch, Route, Redirect } from "react-router-dom"

import PWAPrompt from "templates/PWAPrompt"
import Header from "templates/Header"
import { HomePage, MainPage, ZaboUploadPage, MyPage, AuthPage, GroupPage, GroupAddPage } from "components/pages"
import AuthCallback from "organisms/AuthCallback"
import WindowResizeListener from "containers/WindowResizeListener"

import AppWrapper from "./App.styled"

import { PrivateRoute, PublicRoute } from "./hoc/AuthRoutes"

function App() {
	return (
		<AppWrapper>
			<WindowResizeListener />
			<PWAPrompt />
			<Route path="/:route?" component={Header} />
			<Route path="/" exact component={AuthCallback} />
			<Switch>
				<Route path="/" exact component={HomePage} />
				<PublicRoute path="/auth" component={AuthPage} />
				<Route path="/main" component={MainPage} />
				<Route path="/zabo/upload" component={ZaboUploadPage} />
        <PrivateRoute path="/my-page/group/add" component={GroupAddPage} />
        <PrivateRoute path="/my-page/group" component={GroupPage} />
				<PrivateRoute path="/my-page" component={MyPage} />
			</Switch>
		</AppWrapper>
	)
}

export default App;
