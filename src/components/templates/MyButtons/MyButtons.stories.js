import React from "react"
import { storiesOf } from "@storybook/react"

import MyButtons from "./MyButtons"

storiesOf("templates/MyButtons", module).add(
	"Default",
	() => (
		<MyButtons />
	), {
		notes: ""
	}
)