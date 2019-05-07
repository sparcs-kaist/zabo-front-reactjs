import React from "react"
import { storiesOf } from "@storybook/react"

import Hubo_ZaboPages from "./Hubo_ZaboPages"

storiesOf("pages/Hubo_ZaboPages", module).add(
	"Default",
	() => (
		<Hubo_ZaboPages />
	), {
		notes: ""
	}
)