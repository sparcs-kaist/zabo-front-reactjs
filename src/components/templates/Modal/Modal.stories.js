import React from "react"
import { storiesOf } from "@storybook/react"

import Modal from "./index"

storiesOf("templates/Modal", module).add("Default", () => <Modal />, {
	notes: "",
})
