import React from "react"
import { storiesOf } from "@storybook/react"

import Todo from "./Todo"

storiesOf("molecules/Todo", module).add(
	"Default",
	() => (
		<Todo />
	), {
		notes: ""
	}
)