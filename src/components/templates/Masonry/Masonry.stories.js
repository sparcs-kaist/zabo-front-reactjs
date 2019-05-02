import React from "react"
import { storiesOf } from "@storybook/react"

import Masonry from "./Masonry"

storiesOf("templates/Masonry", module).add(
	"Default",
	() => (
		<Masonry />
	), {
		notes: ""
	}
)