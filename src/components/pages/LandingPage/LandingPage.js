import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Header from 'templates/Header';
import ZaboList from 'templates/ZaboList';

import landingBackground from 'static/images/landingBackground.png';
import rightArrowForward from 'static/images/rightArrowForward.png';

const Wrapper = styled.section`
  height: 100vh;
  width: 100%;
`;

Wrapper.Header = styled.div`
  margin: -50px 0 30px;
  padding: 50px 0 0;
  min-width: 1072px;
  background-image: url(${landingBackground});
  background-repeat: no-repeat;
  background-size: cover;
  height: 520px;

  display: flex;
  flex-direction: column;
  align-items: center;
  
  .header-body {
    width: 1032px;
    h1 {
      color: white;
      margin: 105px 0 0;
      font-size: 32px;
      font-weight: 800;
    }
    h3 {
      color: white;
      margin: 12px 0 98px;
      font-size: 32px;
      font-weight: 300;
    }
    a { display: inline-block }
    button {
      height: 52px;
      border: 1px solid #FFFFFF;
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.15);
      font-size: 16px;
      color: white;
      padding: 0 16px;
      display: flex;
      align-items: center;
      img {
        margin-left: 8px;
        width: 24px;
        height: 24px;
      }
    }
  }
  @media (max-width: 640px) {
    height: 349px;
    min-width: 100%;
    padding: 0 24px;
    .header-body {
      width: 100%;
      h1, h3 { font-size: 20px }
      button {
        height: 40px;
        font-size: 14px;
        padding: 0 14px;
        img {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
`;

const TopBanner = () => {

};
const LandingPage = () => (
  <Wrapper>
    <Wrapper.Header>
      <Header type="upload" scrollHeader transparent logoColor="white" />
      <div className="header-body">
        <h1>이제 포스터 확인은 자보에서.</h1>
        <h3>카이스트의 소식을 바로 알아보세요</h3>
        <Link to="/zabo/upload">
          <button type="button">
            <div>자보 업로드</div>
            <img src={rightArrowForward} alt="right-arrow icon" />
          </button>
        </Link>
      </div>
    </Wrapper.Header>
    <ZaboList type="main" />
  </Wrapper>
);

export default LandingPage;
