import React from "react"
import { storiesOf } from "@storybook/react"

import GroupPage from "./index"

storiesOf("pages/GroupPage", module).add("Default", () => <GroupPage />, {
	notes: "",
})
