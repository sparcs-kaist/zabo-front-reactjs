import React from "react"
import { storiesOf } from "@storybook/react"

import ZaboGraph from "./index"

storiesOf("templates/ZaboGraph", module).add(
	"Default",
	() => (
		<ZaboGraph />
	), {
		notes: ""
	}
)
