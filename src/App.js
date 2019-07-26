import React from "react"

import { Route, Switch } from "react-router-dom"

import PWAPrompt from "templates/PWAPrompt"
import Header from "templates/Header"
import { AuthPage, GroupAddPage, GroupPage, HomePage, MainPage, MyPage, ZaboUploadPage } from "components/pages"
import AuthCallback from "organisms/AuthCallback"
import WindowResizeListener from "containers/WindowResizeListener"

import pToP from "hoc/paramsToProps"

import AppWrapper from "./App.styled"

import { PrivateRoute, PublicRoute } from "./hoc/AuthRoutes"

function App() {
	return (
		<AppWrapper>
			<WindowResizeListener/>
			<PWAPrompt/>
			<Route path="/:route?" component={Header}/>
			<Route path="/" exact component={AuthCallback}/>
			<Switch>
				<Route path="/zabo/upload" component={ZaboUploadPage}/>
				<Route path="/zabo/:zaboId" component={pToP(HomePage)}/>
				<Route path="/" exact component={HomePage}/>
				<PublicRoute path="/auth" component={AuthPage}/>
				<Route path="/main" component={MainPage}/>
				<PrivateRoute path="/my-page/group/add" component={GroupAddPage}/>
				<PrivateRoute path="/my-page/group" component={GroupPage}/>
				<PrivateRoute path="/my-page" component={MyPage}/>
			</Switch>
		</AppWrapper>
	)
}

export default App
