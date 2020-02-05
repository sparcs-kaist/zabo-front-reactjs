import React from 'react';
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import { ZaboDetailPage, NotFound, ZaboEditPage } from 'pages';
import Header from '../../templates/Header';

import { ZaboPageWrapper } from './ZaboPage.styled';
import paramsToProps from '../../../hoc/paramsToProps';

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
