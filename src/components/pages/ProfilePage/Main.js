import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';

import { NotFound } from 'pages';

import ProfilePage from './ProfilePage';

const ProfilePageWrapper = styled.section``;

const Main = () => {
  const match = useRouteMatch ();

  return (
    <ProfilePageWrapper>
      <Switch>
        <Route exact path={`${match.path}`} component={ProfilePage} />
        <Route component={NotFound} />
      </Switch>
    </ProfilePageWrapper>
  );
};


Main.propTypes = {

};

export default Main;
