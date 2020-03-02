import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import useSWR from 'swr';

import { CategoryListW, CategoryW } from 'atoms/Category';
import SVG from 'atoms/SVG';
import TwoCol from 'atoms/TwoCol';
import ZaboCard from 'organisms/ZaboCard';
import Header from 'templates/Header';
import ZaboList from 'templates/ZaboList';

import { getHotZaboList as getHotZaboListAction } from 'store/reducers/zabo';
import { getRecommendedGroups } from 'lib/api/group';
import { isAuthedSelector } from 'lib/utils';

import helpIcon from 'static/icon/help.svg';
import bannerPoster from 'static/images/banner_poster.png';
import bannerSparcs from 'static/images/banner_sparcs.png';

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
  performance: '공연',
  schedule: '행사',
  seminar: '세미나',
};

const TopBanner = () => {
  const history = useHistory ();
  const isAuthenticated = useSelector (isAuthedSelector);

  return (
    <TopBannerW>
      <Container>
        <h1>이제 포스터 확인은 자보에서.</h1>
        <h3>카이스트의 소식을 바로 알아보세요</h3>
        <TopBannerW.Buttons>
          <ButtonW
            color="main"
            type="button"
            onClick={e => {
              if (!isAuthenticated) return alert ('로그인이 필요합니다.');
              return history.push ('/settings/group/apply');
            }}
          >
            <div>신규 그룹 신청</div>
            <SVG icon="arrowRight" />
          </ButtonW>
          <ButtonW
            color="white"
            type="button"
            onClick={e => {
              if (!isAuthenticated) return alert ('로그인이 필요합니다.');
              return history.push ('/zabo/upload');
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
  <CategoryNavW to={`/search?category=${categoriesK[category]}`}>
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
    <Container>
      {categories.map (category => (
        <Category key={category} category={category} />
      ))}
    </Container>
  </CategoryBannerW>
);

const Upcoming = () => (
  <UpcomingW>
    <Container>
      <TwoCol mobileWrap={false}>
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
          <UpcomingW.Count>
            2/8
          </UpcomingW.Count>
        </TwoCol.Left>
        <TwoCol.Right>
          <UpcomingW.Carousel />
        </TwoCol.Right>
      </TwoCol>
    </Container>
  </UpcomingW>
);

const swrOpts = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
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
            <BannerW.Button onClick={e => history.push ('/settings/group/apply')} color="red50">
              신규 그룹 신청 <SVG icon="arrowRight" />
            </BannerW.Button>
          </BannerW.Writings>
          <BannerW.Image src={bannerPoster} />
        </BannerW>
        <BannerW>
          <BannerW.Writings>
            <BannerW.Title>
              자보, 드디어 정식 런칭!
            </BannerW.Title>
            <BannerW.Description>
              자보 홍보하고 베스타 받으세요.
            </BannerW.Description>
            <BannerW.Button color="main">
              자세히 보기 <SVG icon="arrowRight" />
            </BannerW.Button>
          </BannerW.Writings>
          <BannerW.Image src={bannerSparcs} />
        </BannerW>
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
