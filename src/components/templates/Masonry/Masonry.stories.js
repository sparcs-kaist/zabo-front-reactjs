import React from "react"
import { storiesOf } from "@storybook/react"

import Masonry from "./index"

storiesOf("templates/Masonry", module).add(
	"Default",
	() => (
		<Masonry />
	), {
		notes: ""
	}
)