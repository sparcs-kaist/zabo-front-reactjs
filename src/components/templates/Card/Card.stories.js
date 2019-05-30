import React from "react"
import { storiesOf } from "@storybook/react"

import Card from "./Card"

storiesOf("templates/Card", module).add(
	"Default",
	() => (
		<Card />
	), {
		notes: ""
	}
)