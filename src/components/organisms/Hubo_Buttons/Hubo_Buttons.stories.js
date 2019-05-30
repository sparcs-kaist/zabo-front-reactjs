import React from "react"
import { storiesOf } from "@storybook/react"

import Hubo_Buttons from "./Hubo_Buttons.container"

storiesOf("organisms/Hubo_Buttons", module).add(
	"Default",
	() => (
		<Hubo_Buttons />
	), {
		notes: ""
	}
)