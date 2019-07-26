import React from "react"
import { storiesOf } from "@storybook/react"

import Feedback from "./index"

storiesOf("organisms/Feedback", module).add(
	"Default",
	() => (
		<Feedback />
	), {
		notes: ""
	}
)