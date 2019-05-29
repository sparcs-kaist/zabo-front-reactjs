import React from "react"
import Loadable from "react-loadable"

import Loading from "../templates/Loading"

export const HomePage = Loadable({
    loader: () => import("./HomePage"),
    loading: Loading
})

export const MainPage = Loadable({
    loader: () => import("./MainPage"),
    loading: Loading
})

export const ZaboPage = Loadable({
    loader: () => import("./ZaboUpload"),
    loading: Loading
});
