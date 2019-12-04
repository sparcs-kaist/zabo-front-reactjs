import React from "react"
import { storiesOf } from "@storybook/react"

import GroupAddPage from "./index"

storiesOf("pages/GroupAddPage", module).add("Default", () => <GroupAddPage />, {
	notes: "",
})
