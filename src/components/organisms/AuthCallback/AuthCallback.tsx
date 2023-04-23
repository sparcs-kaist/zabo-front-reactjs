import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import queryString from "query-string";
import type { RouteComponentProps } from "react-router-dom";

import { loginCallback } from "store/reducers/auth";
import storage from "lib/storage";
import type { Action } from "redux-actions";

// TODO
// This is a temporary fix to avoid type errors
// We should find a way to infer types from redux middlewares
interface Dispatch {
  <P>(action: Action<P>): P;
}

const AuthCallback: React.FC<RouteComponentProps> = ({ location, history }) => {
  const dispatch = useDispatch<Dispatch>();
  useEffect(() => {
    const { code, state } = queryString.parse(location.search);
    if (typeof code === "string" && typeof state === "string") {
      dispatch(loginCallback(code, state))
        .then((res) => {
          const referrer = storage.getItem("referrer");
          if (referrer) {
            storage.removeItem("referrer");
            history.replace(referrer);
            return;
          }
          history.replace(`/${res.user.username}`);
        })
        .catch((error) => {
          alert(error.message);
          history.replace("/");
        });
    }
  }, [dispatch, history, location.search]);
  return null;
};

export default AuthCallback;
