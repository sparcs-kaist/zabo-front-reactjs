import React from 'react';

import logo from 'static/logo/logo_white.svg';

import { MainFooterW } from './MainFooter.styled';

// TODO: white sparcs logo svg
const MainFooter = () => (
  <MainFooterW>
    <a href="https://sparcs.org" target="_blank" rel="noopener noreferrer">
      <img alt="logo" src={logo} style={{ height: '25px' }} />
    </a>
    <MainFooterW.Links>
      <MainFooterW.Button>만든 사람들</MainFooterW.Button>
      <MainFooterW.Button>라이센스</MainFooterW.Button>
    </MainFooterW.Links>
    <MainFooterW.Contact>Contact:zabo@sparcs.org</MainFooterW.Contact>
  </MainFooterW>
);

export default MainFooter;
