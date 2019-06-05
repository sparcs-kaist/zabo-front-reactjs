import React from "react"
import { storiesOf } from "@storybook/react"

import SVG from "./SVG"

storiesOf("atoms/SVG", module).add(
	"Default",
	() => (
		<SVG />
	), {
		notes: ""
	}
)