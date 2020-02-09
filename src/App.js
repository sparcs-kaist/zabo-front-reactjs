import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ErrorBoundary from 'components/ErrorBoundary';
import AuthCallback from 'organisms/AuthCallback';
import PWAPrompt from 'templates/PWAPrompt';
import {
  AdminPage,
  HomePage,
  NotFound,
  ProfilePage,
  SearchPage,
  SettingsPage,
  ZaboPage,
  ZaboUploadPage,
} from 'pages';

import { AdminRoute, PrivateRoute } from 'hoc/AuthRoutes';
import pToP from 'hoc/paramsToProps';

import AppWrapper from './App.styled';

const App = () => (
  <AppWrapper>
    <ErrorBoundary>
      <PWAPrompt />
      <Route path="/" exact component={AuthCallback} />
      <Switch>
        <Route path="/search" component={SearchPage} />
        <Route path="/zabo/upload" component={ZaboUploadPage} />
        <Route path="/zabo/:zaboId" component={pToP (ZaboPage)} />
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
