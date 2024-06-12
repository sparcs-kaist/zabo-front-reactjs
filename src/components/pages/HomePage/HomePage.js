import React from "react";

import Header from "components/templates/Header";
import ZaboList from "components/templates/ZaboList";

import HomePageWrapper, { Container, TopBannerW, TagListW } from "./HomePage.styled";

import SearchBar from "components/templates/SearchBar/SearchBar";
import TagList from "components/atoms/TagList/TagList";

const HomePage = () => {
  const onTagClick = () => {
    return;
  };

  return (
    <HomePageWrapper className="animated fadeIn">
      <TopBannerW>
        <Container>
          <h1>이제 포스터 확인은 자보에서.</h1>
          <h3>카이스트의 소식을 바로 알아보세요</h3>
        </Container>
      </TopBannerW>

      <Header type="upload" />
      <SearchBar type="upload" scrollHeader expand={false} />
      <TagListW>
        <TagList type="search" onTagClick={onTagClick} clickedTags={[]} />
      </TagListW>
      <ZaboList type="main" />
    </HomePageWrapper>
  );
};

HomePage.propTypes = {};

HomePage.defaultProps = {};

export default HomePage;
