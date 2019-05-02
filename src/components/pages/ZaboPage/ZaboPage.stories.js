import React from "react"
import { storiesOf } from "@storybook/react"

import ZaboPage from "./ZaboPage.container"

storiesOf("pages/ZaboPage", module).add(
	"Default",
	() => (
		<ZaboPage />
	), {
		notes: ""
	}
)
