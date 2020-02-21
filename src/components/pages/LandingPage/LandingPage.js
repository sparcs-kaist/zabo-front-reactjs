import React from 'react';
import styled from 'styled-components';

import Header from 'templates/Header';

const Wrapper = styled.section`
  margin-top: -50px;
  background-color: black;
  height: 100vh;
  width: 100%;
`;

const TopBanner = () => {

};
const LandingPage = () => (
  <Wrapper>
    <Header rightGroup={<Header.AuthButton />} transparent logoColor="white" />

  </Wrapper>
);

export default LandingPage;
