import React from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import styled from "styled-components";

import { NotFound } from "components/pages";

import pToP from "../../../hoc/paramsToProps";
import GroupApply from "./GroupApply";
import GroupMembersSetting from "./GroupMembersSetting";
import GroupProfileSetting from "./GroupProfileSetting";
import ProfileSetting from "./ProfileSetting";

const SettingsWrapper = styled.section``;

const Main = () => {
  const { path } = useRouteMatch();
  return (
    <SettingsWrapper>
      <Switch>
        <Route path={`${path}/group/apply`} component={GroupApply} />
        <Redirect exact from={`${path}/group/:groupName`} to={`${path}/group/:groupName/profile`} />
        <Route path={`${path}/group/:groupName/profile`} component={pToP(GroupProfileSetting)} />
        <Route path={`${path}/group/:groupName/members`} component={pToP(GroupMembersSetting)} />
        <Route path={`${path}/profile`} component={ProfileSetting} />
        <NotFound />
      </Switch>
    </SettingsWrapper>
  );
};

export default Main;
