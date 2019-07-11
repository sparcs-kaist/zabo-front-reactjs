import React from "react"
import { storiesOf } from "@storybook/react"

import LoginPage from "./index"

storiesOf("pages/LoginPage", module).add(
	"Default",
	() => (
		<LoginPage />
	), {
		notes: ""
	}
)