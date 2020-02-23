import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import SVG from 'atoms/SVG';
import TwoCol from 'atoms/TwoCol';
import Header from 'templates/Header';
import ZaboList from 'templates/ZaboList';

import { isAuthedSelector } from 'lib/utils';

import rightArrowForward from 'static/images/rightArrowForward.png';

import LandingPageWrapper, {
  CategoryBannerW,
  CategoryW,
  Container,
  TopBanner,
  UpcomingW,
} from './LandingPage.styled';

const categories = [
  'schedule',
  'performance',
  'festival',
  'seminar',
  'education',
  'group',
  'event',
];
const categoriesK = {
  education: '교육',
  event: '이벤트',
  festival: '축제',
  group: '모임',
  peformance: '공연',
  schedule: '행사',
  seminar: '세미나',
};

const Category = ({ category }) => (
  <CategoryW>
    <CategoryW.Image category={category} />
    <CategoryW.Label>
      {categoriesK[category]}
    </CategoryW.Label>
  </CategoryW>
);

Category.propTypes = {
  category: PropTypes.string.isRequired,
};

const CategoryBanner = () => (
  <CategoryBannerW>
    <Container>
      {categories.map (category => (
        <Category key={category} category={category} />
      ))}
      <Category key="rightArrow" category="rightArrow" />
    </Container>
  </CategoryBannerW>
);

const Upcoming = () => (
  <UpcomingW>
    <Container>
      <TwoCol>
        <TwoCol.Left>
          <UpcomingW.Title>
          SPARCS 2019 가을 리크루팅
          </UpcomingW.Title>
          <UpcomingW.Description>
          얼마 남지 않았어요
          </UpcomingW.Description>
          <UpcomingW.Timer>
          07:14:21
          </UpcomingW.Timer>
          <UpcomingW.Button>
            자세히 보기 <SVG icon="arrowRight" />
          </UpcomingW.Button>
        </TwoCol.Left>
        <TwoCol.Right>
          <UpcomingW.Carousel />
        </TwoCol.Right>
      </TwoCol>
    </Container>
  </UpcomingW>
);

const LandingPage = () => {
  const isAuthenticated = useSelector (isAuthedSelector);
  return (
    <LandingPageWrapper>
      <Header type="upload" transparent logoColor="white" />
      <TopBanner>
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
      </TopBanner>
      <CategoryBanner />
      <Upcoming />
      <Container>
        <ZaboList type="main" />
      </Container>
    </LandingPageWrapper>
  );
};

export default LandingPage;
