import React from "react"
import { storiesOf } from "@storybook/react"

import SearchPage from "./index"

storiesOf("pages/SearchPage", module).add(
	"Default",
	() => (
		<SearchPage />
	), {
		notes: ""
	}
)