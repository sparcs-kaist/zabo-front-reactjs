import React from "react"
import { storiesOf } from "@storybook/react"

import AuthCallback from "./AuthCallback"

storiesOf("organisms/AuthCallback", module).add(
	"Default",
	() => (
		<AuthCallback />
	), {
		notes: ""
	}
)