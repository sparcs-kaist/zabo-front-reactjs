import React from "react";
import { storiesOf } from "@storybook/react";

import PWAPrompt from "./index";

storiesOf("templates/PWAPrompt", module).add("Default", () => <PWAPrompt />, {
  notes: "",
});
