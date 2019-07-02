import React from "react"

import { Switch, Route, Redirect } from "react-router-dom"

import Header from "templates/Header"
import { HomePage, MainPage, ZaboUploadPage, MyPage } from "components/pages"
import AuthCallback from "organisms/AuthCallback"

import AppWrapper from "./App.styled"

function login () {
  /*some login logic */
  userAuth.authFunction();
}

const userAuth = {
  isAuthenticated : false,

  authFunction() {
    this.isAuthenticated = true;
    setTimeout(100);
  },

  signOut() {
    this.isAuthenticated = false;
    setTimeout(100);
  },
};

const ProtectedRoute = ({ component: Component, ...props}) => (
  <Route {...props} render={(props) => (
    userAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to='/main' />
  )} />
);

function App() {

  login();

	return (
		<AppWrapper>
			<Route path="/:route?" component={Header} />
			<Route path="/" exact component={AuthCallback} />
			<Switch>
				<Route path="/" exact component={HomePage} />
				<Route path="/main" component={MainPage} />
				<Route path="/zabo/upload" component={ZaboUploadPage} />
        <ProtectedRoute path={"/my-page"} component={MyPage}/>
			</Switch>
		</AppWrapper>
	)
}

export default App;
