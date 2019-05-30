import React from "react"
import { storiesOf } from "@storybook/react"

import VisualText from "./VisualText"

storiesOf("organisms/VisualText", module).add(
	"Default",
	() => (
		<VisualText />
	), {
		notes: ""
	}
)