import React from "react"
import { storiesOf } from "@storybook/react"

import ZaboList from "./index"

storiesOf("templates/ZaboList", module).add(
	"Default",
	() => (
		<ZaboList />
	), {
		notes: ""
	}
)