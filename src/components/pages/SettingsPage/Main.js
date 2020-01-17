import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';

import { NotFound } from 'components/pages';
import ProfileSetting from './ProfileSetting';
import GroupSetting from './GroupSetting';

import pToP from '../../../hoc/paramsToProps';

const SettingsWrapper = styled.section``;

const Main = () => {
  const match = useRouteMatch ();
  return (
    <SettingsWrapper>
      <Switch>
        <Route path={`${match.url}/profile`} component={ProfileSetting} />
        <Route path={`${match.url}/group/:groupName`} component={pToP (GroupSetting)} />
        <NotFound />
      </Switch>
    </SettingsWrapper>
  );
};

export default Main;
