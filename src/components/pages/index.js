import React from "react"
import Loadable from "react-loadable"

import Loading from "../templates/Loading"

export const HomePage = Loadable({
    loader: () => import("./HomePage"),
    loading: Loading
})