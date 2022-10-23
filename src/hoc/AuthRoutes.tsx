import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useSelector } from "react-redux";

import { isAdminOrPendingSelector, isAuthedSelector } from "lib/utils";

import { alerts } from "../lib/variables";

export const PrivateRoute = ({
  component: Component,
  render = () => null,
  ...rest
}: RouteProps) => {
  const isAuthenticated = useSelector(isAuthedSelector);
  // TODO: Return loading while auth info not fetched
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          Component ? (
            <Component {...props} />
          ) : (
            render(props)
          )
        ) : window.confirm(alerts.login) ? (
          <Redirect
            to={{ pathname: "/auth/login", state: { referrer: props.location.pathname } }}
          />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export const PublicRoute = ({ component: Component, render = () => null, ...rest }: RouteProps) => {
  const isAuthenticated = useSelector(isAuthedSelector);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated) {
          const { location, history } = props;
          const { state } = location;
          // @ts-ignore
          if (state && state.referrer === "comeback") history.goBack();
          // @ts-ignore
          else if (state && state.referrer) history.replace(state.referrer);
          else history.push("/", { referrer: "public" });
          return null;
        }
        if (Component) return <Component {...props} />;
        return render(props);
      }}
    />
  );
};

export const AdminRoute = ({ component: Component, render = () => null, ...rest }: RouteProps) => {
  const [isAdmin, pending] = useSelector(isAdminOrPendingSelector);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (pending) return null;
        if (!isAdmin) return <Redirect to="/" />;
        if (Component) return <Component {...props} />;
        return render(props);
      }}
    />
  );
};
