import styled from 'styled-components';

const ZaboListWrapper = styled.div`
  width: 100%;

  /* 
   * Poster Layout
   * poster = 240px, column space = 10px
   * .container padding = 0px 20px
   * num of posters: total width
   * 1: 240px
   * 2: 490px   => 530 ~
   * 3: 760px    => 800 ~ 
   * 4: 1020px    => 1060 ~
   * >>> on const sizes of ZaboList.js
   */

  .masonry .masonry-main {
    margin: 20px auto 0 auto;
    width: 100%;
  }
`;

export default ZaboListWrapper;
