import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import ChannelTalk from 'containers/ChannelTalk';
import ScrollToTop from 'containers/ScrollToTop';
import ErrorBoundary from 'components/ErrorBoundary';
import AuthCallback from 'organisms/AuthCallback';
import PWAPrompt from 'templates/PWAPrompt';
import {
  AdminPage,
  ApiPage,
  AuthPage,
  HomePage,
  LandingPage,
  NotFound,
  ProfilePage,
  SearchPage,
  SettingsPage,
  ZaboPage,
  ZaboUploadPage,
} from 'pages';

import { AdminRoute, PrivateRoute, PublicRoute } from 'hoc/AuthRoutes';
import pToP from 'hoc/paramsToProps';

import AppWrapper from './App.styled';

const App = () => (
  <AppWrapper>
    <Helmet>
      <title>ZABO - 자보</title>
      <meta name="description" content="자보는 동아리 리크루팅, 공연, 행사 등을 손쉽게 홍보할 수 있도록 도와주는 웹 플랫폼입니다." />
      <meta property="og:title" content="ZABO - 자보" />
      <meta property="og:description" content="이제 포스터 확인은 자보에서." />
      <meta property="og:image" content="https://sparcs-public.s3.ap-northeast-2.amazonaws.com/zabo/og_image.png" />
    </Helmet>
    <ErrorBoundary>
      <PWAPrompt />
      <Route path="/" exact component={AuthCallback} />
      <ScrollToTop updateWithPath />
      <Route path="/:top?" component={ChannelTalk} />
      <Switch>
        <Route path="/search" component={SearchPage} />
        <PrivateRoute path="/zabo/upload" component={ZaboUploadPage} />
        <Route path="/zabo/:zaboId" component={pToP (ZaboPage)} />
        <PrivateRoute path="/settings" component={SettingsPage} />
        <AdminRoute path="/admin" component={AdminPage} />
        <PublicRoute path="/auth" component={AuthPage} />
        <Route path="/api" component={ApiPage} />
        <Route path="/" exact component={LandingPage} />
        <Route path="/main" exact component={HomePage} />
        <Route path="/:name" component={ProfilePage} />
        <Route component={NotFound} />
      </Switch>
    </ErrorBoundary>
  </AppWrapper>
);

export default App;
