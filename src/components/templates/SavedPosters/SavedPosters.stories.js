import React from "react"
import { storiesOf } from "@storybook/react"

import SavedPosters from "./SavedPosters"

storiesOf("templates/SavedPosters", module).add("Default", () => <SavedPosters />, {
	notes: "",
})
