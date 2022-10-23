import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import queryString from "query-string";

import { loginCallback } from "store/reducers/auth";
import storage from "lib/storage";

const AuthCallback = ({ location, history }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const { code, state } = queryString.parse(location.search);
    if (code && state) {
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
  }, []);
  return null;
};

export default AuthCallback;
