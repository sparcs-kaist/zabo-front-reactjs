import React from "react"
import { storiesOf } from "@storybook/react"

import TodoList  from "./index"

storiesOf("templates/TodoList", module).add(
	"Default",
	() => (
		<TodoList />
	), {
		notes: ""
	}
)
