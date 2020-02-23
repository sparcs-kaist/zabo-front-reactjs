import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from 'templates/Header';
import ZaboList from 'templates/ZaboList';

import { isAuthedSelector } from 'lib/utils';

import rightArrowForward from 'static/images/rightArrowForward.png';

import LandingPageWrapper, { Banner, ZaboListContainer } from './LandingPage.styled';

const LandingPage = () => {
  const isAuthenticated = useSelector (isAuthedSelector);
  return (
    <LandingPageWrapper>
      <Header type="upload" transparent logoColor="white" />
      <Banner>
        <div className="header-body">
          <h1>이제 포스터 확인은 자보에서.</h1>
          <h3>카이스트의 소식을 바로 알아보세요</h3>
          {
            isAuthenticated ? (
              <Link to="/zabo/upload">
                <button type="button">
                  <div>자보 업로드</div>
                  <img src={rightArrowForward} alt="right-arrow icon" />
                </button>
              </Link>
            )
              : (
                <button
                  type="button"
                  onClick={() => {
                    alert ('로그인이 필요합니다.');
                  }}
                >
                  <div>자보 업로드</div>
                  <img src={rightArrowForward} alt="right-arrow icon" />
                </button>
              )
          }
        </div>
      </Banner>
      <ZaboListContainer>
        <ZaboList type="main" />
      </ZaboListContainer>
    </LandingPageWrapper>
  );
};

export default LandingPage;
