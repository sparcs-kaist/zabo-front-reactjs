import React from "react"
import { storiesOf } from "@storybook/react"

import VisualTextToggleButton from "./VisualTextToggleButton"

storiesOf("organisms/VisualTextToggleButton", module).add(
	"Default",
	() => (
		<VisualTextToggleButton />
	), {
		notes: ""
	}
)