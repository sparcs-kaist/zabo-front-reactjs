import Loadable from "react-loadable"

import Loading from "../templates/Loading"

export const HomePage = Loadable({
    loader: () => import("./HomePage"),
    loading: Loading
});

export const MainPage = Loadable({
    loader: () => import("./MainPage"),
    loading: Loading
});

export const ZaboUploadPage = Loadable({
    loader: () => import("./ZaboUpload"),
    loading: Loading
});

export const MyPage = Loadable({
    loader: () => import("./MyPage"),
    loading: Loading
});

export const AuthPage = Loadable({
    loader: () => import("./AuthPage"),
    loading: Loading
})

export const LoginPage = Loadable({
    loader: () => import("./LoginPage"),
    loading: Loading
})
