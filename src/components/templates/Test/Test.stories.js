import React from "react"
import { storiesOf } from "@storybook/react"

import Test from "./Test"

storiesOf("templates/Test", module).add(
	"Default",
	() => (
		<Test />
	), {
		notes: ""
	}
)