import React from "react"
import { storiesOf } from "@storybook/react"

import Buttons from "./Buttons"

storiesOf("templates/Buttons", module).add(
	"Default",
	() => (
		<Buttons />
	), {
		notes: ""
	}
)