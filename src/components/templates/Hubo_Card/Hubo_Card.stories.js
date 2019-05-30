import React from "react"
import { storiesOf } from "@storybook/react"

import Hubo_Card from "./Hubo_Card"

storiesOf("templates/Hubo_Card", module).add(
	"Default",
	() => (
		<Hubo_Card />
	), {
		notes: ""
	}
)