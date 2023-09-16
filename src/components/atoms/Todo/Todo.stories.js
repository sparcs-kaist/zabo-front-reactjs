import React from "react";
import { storiesOf } from "@storybook/react";

import Todo from "./index";

storiesOf("atoms/Todo", module).add("Default", () => <Todo />, {
  notes: "",
});
