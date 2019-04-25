import React from "react"

import { Switch, Route } from "react-router-dom"

import { HomePage } from "./components/pages"

import logo from "./logo.svg"

import AppWrapper from "./App.styled"

function App() {
	return (
		<AppWrapper>
			<Switch>
				<Route
					path="/"
					render={props => (
						<header className="App-header">
							<img src={logo} className="App-logo" alt="logo" />
							<p>
								Edit <code>src/App.js</code> and save to reload.
							</p>
							<a
								className="App-link"
								href="https://reactjs.org"
								target="_blank"
								rel="noopener noreferrer"
							>
								Learn React
							</a>
						</header>
					)}
				/>
				<Route path="/home" component={HomePage} />
			</Switch>
		</AppWrapper>
	)
}

export default App
