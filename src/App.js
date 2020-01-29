import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PWAPrompt from 'templates/PWAPrompt';
import {
  AuthPage,
  HomePage,
  SettingsPage,
  ZaboUploadPage,
  ZaboPage,
  NotFound,
  ProfilePage,
  AdminPage,
} from 'components/pages';
import AuthCallback from 'organisms/AuthCallback';
import WindowResizeListener from 'containers/WindowResizeListener';
import ScrollToTop from 'containers/ScrollToTop';

import pToP from 'hoc/paramsToProps';
import ErrorBoundary from './components/ErrorBoundary';

import AppWrapper from './App.styled';

import { AdminRoute, PrivateRoute, PublicRoute } from './hoc/AuthRoutes';

import 'lib/channel_io';

const App = () => (
  <AppWrapper>
    <ErrorBoundary>
      <WindowResizeListener />
      <PWAPrompt />
      <Route path="/zabo/:route?" component={ScrollToTop} />
      <Route path="/" exact component={AuthCallback} />
      <Switch>
        <Route path="/zabo/upload" component={ZaboUploadPage} />
        <Route path="/zabo/:zaboId" component={pToP (ZaboPage)} />
        <PublicRoute path="/auth" component={AuthPage} />
        <PrivateRoute path="/settings" component={SettingsPage} />
        <AdminRoute path="/admin" component={AdminPage} />
        <Route path="/" exact component={HomePage} />
        <Route path="/:name" component={ProfilePage} />
        <Route component={NotFound} />
      </Switch>
    </ErrorBoundary>
  </AppWrapper>
);

export default App;
