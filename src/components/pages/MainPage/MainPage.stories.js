import React from "react"
import { storiesOf } from "@storybook/react"

import MainPage from "./MainPage"

storiesOf("pages/MainPage", module).add(
	"Default",
	() => (
		<MainPage />
	), {
		notes: ""
	}
)