import React from "react"
import { storiesOf } from "@storybook/react"

import Header from "./Header"

storiesOf("templates/Header", module).add(
	"Default",
	() => (
		<Header />
	), {
		notes: ""
	}
)