import React from "react";
import { storiesOf } from "@storybook/react";

import AuthPage from "./index";

storiesOf("pages/AuthPage", module).add("Default", () => <AuthPage />, {
  notes: "",
});
