import React from "react"
import { storiesOf } from "@storybook/react"

import LoginPage from "./LoginPage"

storiesOf("pages/LoginPage", module).add(
	"Default",
	() => (
		<LoginPage />
	), {
		notes: ""
	}
)