import React from "react"
import { storiesOf } from "@storybook/react"

import MainPage from "./index"

storiesOf("pages/MainPage", module).add(
	"Default",
	() => (
		<MainPage />
	), {
		notes: ""
	}
)