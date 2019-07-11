import React from "react"
import { storiesOf } from "@storybook/react"

import AuthCallback from "./index"

storiesOf("organisms/AuthCallback", module).add(
	"Default",
	() => (
		<AuthCallback />
	), {
		notes: ""
	}
)