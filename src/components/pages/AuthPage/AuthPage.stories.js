import React from "react"
import { storiesOf } from "@storybook/react"

import AuthPage from "./AuthPage"

storiesOf("pages/AuthPage", module).add(
	"Default",
	() => (
		<AuthPage />
	), {
		notes: ""
	}
)