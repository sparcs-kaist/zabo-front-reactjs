import React from "react";
import { Redirect, Route, type RouteComponentProps, type RouteProps } from "react-router-dom";
import { type StaticContext } from "react-router";
import { useSelector } from "react-redux";

import { isAdminOrPendingSelector, isAuthedSelector } from "lib/utils";

import { alerts } from "../lib/variables";

export const PrivateRoute: React.FC<RouteProps> = ({
  component: Component,
  render = () => null,
  ...rest
}) => {
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
            to={{
              pathname: "/auth/login",
              state: { referrer: props.location.pathname },
            }}
          />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export const PublicRoute: React.FC<RouteProps> = ({
  component: Component,
  render = () => null,
  ...rest
}) => {
  const isAuthenticated = useSelector(isAuthedSelector);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated) {
          const {
            location: { state },
            history,
          } = props as RouteComponentProps<
            { [key: string]: string | undefined },
            StaticContext,
            { referrer?: string }
          >;
          if (state && state.referrer === "comeback") {
            history.goBack();
          } else if (state && state.referrer) {
            history.replace(state.referrer);
          } else {
            history.push("/", { referrer: "public" });
          }
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
