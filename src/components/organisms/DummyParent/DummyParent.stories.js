import React from "react"
import { storiesOf } from "@storybook/react"

import DummyParent from "./DummyParent"

storiesOf("organisms/DummyParent", module).add(
	"Default",
	() => (
		<DummyParent />
	), {
		notes: ""
	}
)