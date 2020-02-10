import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import Header from 'templates/Header';
import { NotFound, ZaboDetailPage, ZaboEditPage } from 'pages';

import paramsToProps from '../../../hoc/paramsToProps';
import { ZaboPageWrapper } from './ZaboPage.styled';

const Main = () => {
  const { path } = useRouteMatch ();
  return (
    <ZaboPageWrapper>
      <Header rightGroup={<Header.AuthButton />} scrollHeader />
      <Switch>
        <Route exact path={`${path}`} component={paramsToProps (ZaboDetailPage)} />
        <Route path={`${path}/edit`} component={paramsToProps (ZaboEditPage)} />
        <NotFound />
      </Switch>
    </ZaboPageWrapper>
  );
};

export default Main;
