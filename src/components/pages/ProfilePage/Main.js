import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import { NotFound } from 'components/pages';
import ProfilePage from './ProfilePage';

const MyPageWrapper = styled.section``;

const Main = () => {
  const match = useRouteMatch ();

  return (
    <MyPageWrapper>
      <Switch>
        <Route exact path={`${match.path}`} component={ProfilePage} />
        <Route component={NotFound} />
      </Switch>
    </MyPageWrapper>
  );
};


Main.propTypes = {

};

export default Main;
