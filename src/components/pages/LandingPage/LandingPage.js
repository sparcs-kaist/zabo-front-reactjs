import React, {
  useEffect, useReducer, useState,
} from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import Tooltip from '@material-ui/core/Tooltip';
import moment from 'moment';
import useSWR from 'swr';

import { CategoryListW, CategoryW } from 'atoms/Category';
import SVG from 'atoms/SVG';
import TwoCol from 'atoms/TwoCol';
import ScrollBtn from 'molecules/ScrollBtn';
import ZaboCard from 'organisms/ZaboCard';
import Header from 'templates/Header';
import ZaboList from 'templates/ZaboList';

import { getHotZaboList as getHotZaboListAction } from 'store/reducers/zabo';
import { getRecommendedGroups } from 'lib/api/group';
import { getDeadlineZaboList } from 'lib/api/zabo';
import { isAuthedSelector, pushWithAuth } from 'lib/utils';

import helpIcon from 'static/icon/help.svg';
import bannerPoster from 'static/images/banner_poster.png';
import bannerSparcs from 'static/images/banner_sparcs.png';
import leftArrow from 'static/images/leftScroll.png';
import rightArrow from 'static/images/rightScroll.png';

import LandingPageWrapper, {
  BannersW,
  BannerW, ButtonW,
  CategoryBannerW,
  CategoryNavW,
  Container,
  GroupBoxW, RecommendsTitleW,
  RecommendsW,
  TopBannerW,
  UpcomingW, ZaboListTitleW, ZaboListW,
} from './LandingPage.styled';

const categories = [
  'all',
  'hangsa',
  'performance',
  'festival',
  'seminar',
  'education',
  'meeting',
  'event',
  'contest',
  'exhibition',
  'notice',
  'recruit',
  'hire',
  'volunteer',
  'openclub',
  'demoday',
];

const categoriesK = {
  all: '전체보기',
  hangsa: '행사',
  performance: '공연',
  festival: '축제',
  seminar: '세미나',
  education: '교육',
  meeting: '모임',
  event: '이벤트',
  contest: '공모전',
  exhibition: '전시',
  notice: '공지',
  recruit: '모집',
  hire: '채용',
  volunteer: '봉사',
  openclub: '오픈동방',
  demoday: '데모데이',
};

const swrOpts = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

const TopBanner = () => {
  const history = useHistory ();
  const isAuthed = useSelector (isAuthedSelector);
  return (
    <TopBannerW>
      <Container>
        <h1>이제 포스터 확인은 자보에서.</h1>
        <h3>카이스트의 소식을 바로 알아보세요</h3>
        <TopBannerW.Buttons>
          <ButtonW
            color="main"
            type="button"
            onClick={e => { pushWithAuth ('/settings/group/apply', history, isAuthed); }}
          >
            <div>신규 그룹 신청</div>
            <SVG icon="arrowRight" />
          </ButtonW>
          <ButtonW
            color="white"
            type="button"
            onClick={e => {
              pushWithAuth ('/zabo/upload', history, isAuthed);
            }}
          >
            <div>자보 업로드</div>
            <SVG icon="arrowRight" />
          </ButtonW>
        </TopBannerW.Buttons>
      </Container>
    </TopBannerW>
  );
};

const Category = ({ category }) => (
  <CategoryNavW to={categoriesK[category] === '전체보기'
    ? '/main'
    : `/search?category=${categoriesK[category]}`}
  >
    <CategoryNavW.Image category={category} />
    <CategoryNavW.Label>
      {categoriesK[category]}
    </CategoryNavW.Label>
  </CategoryNavW>
);

Category.propTypes = {
  category: PropTypes.string.isRequired,
};

const CategoryBanner = () => (
  <CategoryBannerW>
    <ScrollBtn elemId="categoryList" show scrollSize={1096} right={false} />
    <Container id="categoryList">
      {categories.map (category => (
        <Category key={category} category={category} />
      ))}
      <Container.Pad />
    </Container>
    <ScrollBtn elemId="categoryList" show scrollSize={1096} left={false} />
  </CategoryBannerW>
);

const ArrowLeft = (props) => (
  <UpcomingW.Carousel.Button src={leftArrow} {...props} className="slick-btn prev" alt="left arrow image" />
);
const ArrowRight = (props) => (
  <UpcomingW.Carousel.Button src={rightArrow} {...props} className="slick-btn next" alt="right arrow image" />
);

const SlickItem = ({ zabo }) => (
  <UpcomingW.SlickItemW>
    <UpcomingW.Image
      src={zabo.photos[0].url}
      alt="Upcoming ZABO"
    />
  </UpcomingW.SlickItemW>
);

const twoDigits = (number) => {
  if (number > 0 && number < 10) return `0${number}`;
  return number;
};
const CountDown = ({ initialValue }) => {
  const [tick, dispatch] = useReducer ((state, action) => {
    if (action.type === 'increase') return state + 1;
    if (action.type === 'set') return action.payload;
    return 0;
  }, 0);
  useEffect (() => {
    const timer = setInterval (() => dispatch ({ type: 'increase' }), 1000);
    return () => clearInterval (timer);
  }, [initialValue]);
  useEffect (() => {
    dispatch ({ type: 'set', payload: initialValue / 1000 });
  }, [initialValue]);
  console.log (initialValue, tick);
  const days = Math.floor (tick / 86400);
  const hours = Math.floor (tick / 3600) % 24;
  const mins = Math.floor (tick / 60) % 60;
  const secs = Math.floor (tick % 60);
  return <div>{!!days && days}{!!days && <small>일</small>} {`${twoDigits (hours)}:${twoDigits (mins)}:${twoDigits (secs)}`}</div>;
};
const Upcoming = () => {
  const history = useHistory ();
  const [current, setCurrent] = useState (0);
  const width = useSelector (state => state.getIn (['app', 'windowSize', 'width']));
  const { data: zabos, zaboError } = useSWR ('/zabo/list/deadline', getDeadlineZaboList, swrOpts);

  if (!zabos) {
    return (
      <UpcomingW>
        <Container>
          Loading...
        </Container>
      </UpcomingW>
    );
  }
  const settings = {
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    prevArrow: <ArrowLeft />,
    nextArrow: <ArrowRight />,
    afterChange: setCurrent,
  };

  const currentZabo = zabos[current] || {};
  const { _id, title, schedules } = currentZabo;
  const schedule = schedules[0];
  const { type, title: scheduleTitle, startAt } = schedule;
  const label = `${(type === '신청' ? '신청이 ' : '')}얼마 남지 않았어요`;
  const startAtMoment = moment (startAt);
  const timeLeft = startAtMoment.diff (moment ());
  return (
    <UpcomingW>
      <Container>
        <TwoCol mobileWrap={false}>
          <TwoCol.Left>
            <UpcomingW.Title>
              {scheduleTitle}
            </UpcomingW.Title>
            <UpcomingW.Description>
              {label}
            </UpcomingW.Description>
            <UpcomingW.Timer>
              <CountDown initialValue={timeLeft} />
            </UpcomingW.Timer>
            <UpcomingW.Button onClick={e => history.push (`/zabo/${_id}`)}>
              자세히 보기 <SVG icon="arrowRight" />
            </UpcomingW.Button>
            <UpcomingW.Count>
              {current + 1}/{zabos.length}
            </UpcomingW.Count>
          </TwoCol.Left>
          <TwoCol.Right>
            <UpcomingW.Carousel style={{ width: width / 2 }}>
              <Slider {...settings}>
                {zabos ? zabos.map (zabo => (
                  <SlickItem zabo={zabo} key={zabo._id} />
                )) : <div>none</div>}
              </Slider>
            </UpcomingW.Carousel>
          </TwoCol.Right>
        </TwoCol>
      </Container>
    </UpcomingW>
  );
};

const Recommends = () => {
  const dispatch = useDispatch ();
  const getHotZaboList = () => dispatch (getHotZaboListAction ());
  const { data: zabos, zaboError } = useSWR ('/zabo/list/hot', getHotZaboList, swrOpts);
  const { data: groups, groupError } = useSWR ('/group/recommends', getRecommendedGroups, swrOpts);
  return (
    <RecommendsW>
      <Container>
        <TwoCol divider>
          <RecommendsW.Zabo flex={5}>
            <RecommendsTitleW>
                인기 있는 자보
              <Tooltip title="일정 기간 동안 받은 좋아요 수와 조회수를 기준으로 선정됩니다.">
                <img src={helpIcon} alt="recommendation guide" style={{ marginLeft: 6 }} />
              </Tooltip>
            </RecommendsTitleW>
            {zabos ? zabos.map (({ _id }) => <ZaboCard size="large" zaboId={_id} key={_id} />) : 'Loading'}
          </RecommendsW.Zabo>
          <RecommendsW.Group flex={3}>
            <RecommendsTitleW>이 그룹은 어때요?</RecommendsTitleW>
            <CategoryListW>
              {['동아리', '학생 단체', 'KAIST 부서', '스타트업'].map (cat => <CategoryW>{cat}</CategoryW>)}
              <Tooltip title="그룹 필터링 기능을 개발 중이에요.">
                <img src={helpIcon} alt="recommendation guide" style={{ marginLeft: 6 }} />
              </Tooltip>
            </CategoryListW>
            <RecommendsW.GroupList>
              {groups ? groups.map (group => <GroupBoxW group={group} type="simple" key={group.name} />)
                : 'Loading'}
            </RecommendsW.GroupList>
          </RecommendsW.Group>
        </TwoCol>
      </Container>
    </RecommendsW>
  );
};


export const Banners = () => {
  const history = useHistory ();
  const isAuthed = useSelector (isAuthedSelector);
  return (
    <BannersW>
      <Container>
        <BannerW>
          <BannerW.Writings>
            <BannerW.Title>
              신규 그룹 신청하고
            </BannerW.Title>
            <BannerW.Description>
              자보를 올려 쉽게 홍보하세요
            </BannerW.Description>
            <BannerW.Button
              onClick={e => { pushWithAuth ('/settings/group/apply', history, isAuthed); }}
              color="red50"
            >
              신규 그룹 신청 <SVG icon="arrowRight" />
            </BannerW.Button>
          </BannerW.Writings>
          <BannerW.Image src={bannerPoster} />
        </BannerW>
        <BannerW>
          <BannerW.Writings>
            <BannerW.Title>
              자보를 직접 만들고 싶다면?
            </BannerW.Title>
            <BannerW.Description>
              SPARCS 지원 바로가기
            </BannerW.Description>
            <a href="https://apply.sparcs.org" target="_blank" rel="noopener noreferrer">
              <BannerW.Button color="main">
                지원하기 <SVG icon="arrowRight" />
              </BannerW.Button>
            </a>
          </BannerW.Writings>
          <BannerW.Image src={bannerSparcs} />
        </BannerW>
        <Container.Pad />
      </Container>
    </BannersW>
  );
};

const MainZaboList = () => (
  <Container>
    <ZaboListW>
      <ZaboListTitleW>
        전체 자보 보기
      </ZaboListTitleW>
      <ZaboList type="main" />
    </ZaboListW>
  </Container>
);

const LandingPage = () => (
  <LandingPageWrapper>
    <Header type="upload" transparent logoColor="white" />
    <TopBanner />
    <CategoryBanner />
    <Upcoming />
    <Recommends />
    <Banners />
    <MainZaboList />
  </LandingPageWrapper>
);

export default LandingPage;
