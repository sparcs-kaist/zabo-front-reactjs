import React from "react"
import { storiesOf } from "@storybook/react"

import HyoungJo from "./HyoungJo"

storiesOf("pages/HyoungJo", module).add(
	"Default",
	() => (
		<HyoungJo />
	), {
		notes: ""
	}
)