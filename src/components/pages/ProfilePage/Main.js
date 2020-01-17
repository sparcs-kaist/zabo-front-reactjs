import React from 'react';
import styled from 'styled-components';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import { NotFound } from 'components/pages';
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
