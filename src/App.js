import React from "react"
import logo from "./logo.svg"

import AppWrapper from "./App.styled"

function App() {
	return (
		<AppWrapper>
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
		</AppWrapper>
	)
}

export default App
