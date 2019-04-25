import React from "react"
import { storiesOf } from "@storybook/react"

import HomePage from "./HomePage"
import ReactPlayer from "react-player";

storiesOf("pages/HomePage", module).add(
	"Default",
	() => (
		<HomePage />
	), {
		notes: ""
	}
)
.add("react-player",
	() => (
		<ReactPlayer url="https://soundcloud.com/elektrobin/little-cloud?in=elektrobin/sets/a-christmas-miracle" playing />
	), {
		notes: "https://soundcloud.com/elektrobin/little-cloud?in=elektrobin/sets/a-christmas-miracle"
	}
)

