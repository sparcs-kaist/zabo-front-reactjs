import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isAuthedSelector, isAdminOrPendingSelector } from 'lib/utils';

export const PrivateRoute = (({ component: Component, render, ...rest }) => {
  const isAuthenticated = useSelector (isAuthedSelector);
  console.log ('private');
  return (
    <Route
      {...rest}
      render={props => (
        isAuthenticated ? (
          Component ? <Component {...props} /> : render (props)
        ) : (
          <Redirect to={{ pathname: '/auth/login', state: { referrer: props.location.pathname } }} />
        ))}
    />
  );
});

PrivateRoute.propTypes = Route.propTypes;
PrivateRoute.defaultProps = Route.defaultProps;

export const PublicRoute = ({ component: Component, render, ...rest }) => {
  const isAuthenticated = useSelector (isAuthedSelector);
  console.log ('public');
  return (
    <Route
      {...rest}
      render={props => {
        if (isAuthenticated) {
          const { location, history } = props;
          const { state } = location;
          if (state && state.referrer === 'comeback') history.goBack ();
          else if (state && state.referrer) history.replace (state.referrer);
          else history.push ('/', { referrer: 'public' });
          return null;
        }
        if (Component) return <Component {...props} />;
        return render (props);
      }}
    />
  );
};

PublicRoute.propTypes = Route.propTypes;
PublicRoute.defaultProps = Route.defaultProps;

export const AdminRoute = ({ component: Component, render, ...rest }) => {
  const [isAdmin, pending] = useSelector (isAdminOrPendingSelector);
  return (
    <Route
      {...rest}
      render={props => {
        if (pending) return null;
        if (!isAdmin) return <Redirect to="/" />;
        if (Component) return <Component {...props} />;
        return render (props);
      }}
    />
  );
};

AdminRoute.propTypes = Route.propTypes;
AdminRoute.defaultProps = Route.defaultProps;
