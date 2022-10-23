import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import { NotFound, ZaboDetailPage, ZaboEditPage } from "components/pages";
import Header from "components/templates/Header";

import paramsToProps from "../../../hoc/paramsToProps";
import { ZaboPageWrapper } from "./ZaboPage.styled";

const Main = () => {
  const { path } = useRouteMatch();
  return (
    <ZaboPageWrapper>
      <Header type="upload" scrollHeader />
      <Switch>
        <Route exact path={`${path}`} component={paramsToProps(ZaboDetailPage)} />
        <Route path={`${path}/edit`} component={paramsToProps(ZaboEditPage)} />
        <NotFound />
      </Switch>
    </ZaboPageWrapper>
  );
};

export default Main;
