import React from 'react';
import {
  Switch, Route, useRouteMatch, Redirect,
} from 'react-router-dom';
import styled from 'styled-components';

import { NotFound } from 'components/pages';
import ProfileSetting from './ProfileSetting';
import GroupProfileSetting from './GroupProfileSetting';
import GroupMembersSetting from './GroupMembersSetting';

import pToP from '../../../hoc/paramsToProps';

const SettingsWrapper = styled.section``;

const Main = () => {
  const { path } = useRouteMatch ();
  return (
    <SettingsWrapper>
      <Switch>
        <Redirect exact from={`${path}/group/:groupName`} to={`${path}/group/:groupName/profile`} />
        <Route path={`${path}/group/:groupName/profile`} component={pToP (GroupProfileSetting)} />
        <Route path={`${path}/group/:groupName/members`} component={pToP (GroupMembersSetting)} />
        <Route path={`${path}/profile`} component={ProfileSetting} />
        <NotFound />
      </Switch>
    </SettingsWrapper>
  );
};

export default Main;
