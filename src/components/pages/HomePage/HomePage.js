import React from 'react';

import Header from 'templates/Header';
import ZaboList from 'templates/ZaboList';

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
