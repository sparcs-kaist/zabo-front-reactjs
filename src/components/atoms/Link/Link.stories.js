import React from "react"
import { storiesOf } from "@storybook/react"

import Link from "./Link"

storiesOf("atoms/Link", module).add(
	"Default",
	() => (
		<Link />
	), {
		notes: ""
	}
)