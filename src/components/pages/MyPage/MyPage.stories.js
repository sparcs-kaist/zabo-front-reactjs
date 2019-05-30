import React from "react"
import { storiesOf } from "@storybook/react"

import MyPage from "./MyPage"

storiesOf("pages/MyPage", module).add(
	"Default",
	() => (
		<MyPage />
	), {
		notes: ""
	}
)