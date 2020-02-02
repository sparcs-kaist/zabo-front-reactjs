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
  const match = useRouteMatch ();
  return (
    <SettingsWrapper>
      <Switch>
        <Redirect exact from={`${match.url}/group/:groupName`} to={`${match.url}/group/:groupName/profile`} />
        <Route path={`${match.url}/group/:groupName/profile`} component={pToP (GroupProfileSetting)} />
        <Route path={`${match.url}/group/:groupName/members`} component={pToP (GroupMembersSetting)} />
        <Route path={`${match.url}/profile`} component={ProfileSetting} />
        <NotFound />
      </Switch>
    </SettingsWrapper>
  );
};

export default Main;
