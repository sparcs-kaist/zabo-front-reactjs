import React from "react"
import { storiesOf } from "@storybook/react"

import MyPage from "./index"

storiesOf("pages/MyPage", module).add(
	"Default",
	() => (
		<MyPage />
	), {
		notes: ""
	}
)