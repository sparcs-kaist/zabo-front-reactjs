import React from "react";
import { storiesOf } from "@storybook/react";

import ZaboCard from "./index";

storiesOf("organisms/ZaboCard", module).add("Default", () => <ZaboCard size="medium" />, {
  notes: "",
});
