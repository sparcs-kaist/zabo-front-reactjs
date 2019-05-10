import React from "react"
import { storiesOf } from "@storybook/react"

import Hubo_ZaboPages from "./index"

storiesOf("pages/Hubo_ZaboPages", module).add(
	"Default",
	() => (
		<Hubo_ZaboPages />
	), {
		notes: ""
	}
)