import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import queryString from "query-string";
import type { RouteComponentProps } from "react-router-dom";

import { loginCallback } from "store/reducers/auth";
import storage from "lib/storage";

const AuthCallback: React.FC<RouteComponentProps> = ({ location, history }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const { code, state } = queryString.parse(location.search);
    if (typeof code === "string" && typeof state === "string") {
      dispatch(loginCallback(code, state))
        .payload.then((res) => {
          const referrer = storage.getItem("referrer");
          if (referrer) {
            storage.removeItem("referrer");
            return history.replace(referrer);
          }
          history.replace(`/${res.user.username}`);
        })
        .catch((error) => {
          alert(error.message);
          history.replace("/");
        });
    }
  });
  return null;
};

export default AuthCallback;
