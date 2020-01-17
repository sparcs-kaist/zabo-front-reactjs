import React from 'react';

import { Route, Switch } from 'react-router-dom';

import PWAPrompt from 'templates/PWAPrompt';
import {
  AuthPage,
  GroupAddPage,
  GroupPage,
  HomePage,
  MyPage,
  SettingsPage,
  ZaboUploadPage,
  ZaboPage,
  NotFound,
  ProfilePage,
} from 'components/pages';
import AuthCallback from 'organisms/AuthCallback';
import WindowResizeListener from 'containers/WindowResizeListener';
import ScrollToTop from 'containers/ScrollToTop';

import pToP from 'hoc/paramsToProps';

import AppWrapper from './App.styled';

import { PrivateRoute, PublicRoute } from './hoc/AuthRoutes';

import 'lib/channel_io';

class App extends React.Component {
  componentDidCatch (error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    if (process.env.NODE_ENV !== 'production') {
      this.setState ({
        error,
        errorInfo: { ...errorInfo, url: window.location.href },
      });
    } else {
      alert ('Something went wrong. Please contact us if this error continues to appear.');
      // TODO: Crash Report
      // crashReport({
      // error: error.toString(),
      // errorInfo: { ...errorInfo, url: window.location.href },
      // })
    }
    // You can also log error messages to an error reporting service here
  }

  render () {
    return (
      <AppWrapper>
        <WindowResizeListener />
        <PWAPrompt />
        <Route path="/zabo/:route?" component={ScrollToTop} />
        <Route path="/" exact component={AuthCallback} />
        <Switch>
          <Route path="/zabo/upload" component={ZaboUploadPage} />
          <Route path="/zabo/:zaboId" component={pToP (ZaboPage)} />
          <Route path="/" exact component={HomePage} />
          <PublicRoute path="/auth" component={AuthPage} />
          <PrivateRoute path="/settings" component={SettingsPage} />
          <Route path="/:name" component={ProfilePage} />
          <Route component={NotFound} />
        </Switch>
      </AppWrapper>
    );
  }
}

export default App;
