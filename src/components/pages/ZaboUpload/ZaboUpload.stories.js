import React from "react"
import { storiesOf } from "@storybook/react"

import ZaboUpload from "./index"

storiesOf("pages/ZaboUpload", module).add("Default", () => <ZaboUpload />, {
	notes: "",
})
