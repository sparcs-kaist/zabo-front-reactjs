import { addDecorator, configure } from '@storybook/react'
import { withNotes } from '@storybook/addon-notes'
import '@storybook/addon-console'
//import { withInfo } from "@storybook/addon-info"
import { withKnobs } from '@storybook/addon-knobs'
import { withConsole } from '@storybook/addon-console'

import requireContext from 'require-context.macro'

import React from "react"

import { Provider } from "react-redux"
import { BrowserRouter as Router } from "react-router-dom"
import { ThemeProvider } from "styled-components"

import store from "../src/store"
import theme from "../src/theme"

import '../src/index.scss'

const Decorator = (storyFn) => (
	<Provider store={store}>
		<Router>
			<ThemeProvider theme={theme}>
				{storyFn()}
			</ThemeProvider>
		</Router>
	</Provider>
)

// addDecorator(Decorator)
addDecorator(withNotes)
addDecorator((storyFn, context) => withConsole()(storyFn)(context))
//addDecorator(withInfo)
addDecorator(withKnobs)

//addParameters({
//	chromatic: { viewports: [1320, 992, 768, 576] },
//})

const req = requireContext('../src/components', true, /\.stories\.js$/)

function loadStories() {
	req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
