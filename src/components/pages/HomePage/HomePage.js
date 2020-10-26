import React from 'react';

import Header from 'components/templates/Header';
import ZaboList from 'components/templates/ZaboList';

import HomePageWrapper from './HomePage.styled';

const HomePage = () => (
  <HomePageWrapper className="animated fadeIn">
    <Header type="upload" />
    <div className="container">
      <ZaboList type="main" />
    </div>
  </HomePageWrapper>
);

HomePage.propTypes = {};

HomePage.defaultProps = {};

export default HomePage;
