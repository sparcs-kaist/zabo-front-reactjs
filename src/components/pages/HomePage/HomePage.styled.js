import styled from "styled-components";

/* ============ Wrapper ============ */
const HomePageWrapper = styled.div`
  transition: 0.4s;
  animation-duration: 0.3s;

  /* 
   * Poster Layout
   * poster = 240px, column space = 10px
   * .container padding = 0px 20px
   * num of posters: total width
   * 1: 240px
   * 2: 490px   => 530 ~
   * 3: 760px    => 800 ~ 
   * 4: 1020px    => 1060 ~
   */

  /*  @media (min-width: 0px) and (max-width: 530px) {
    !* .container width auto with padding *!
  }
  @media (min-width: 530px) and (max-width: 800px) {
    .container {
      width: 530px;
    }
  }
  @media (min-width: 800px) and (max-width: 1060px) {
    .container {
      width: 800px;
    }
  }
  @media (min-width: 1060px) {
    .container {
      width: 1060px;
    }
  }*/
`;

export default HomePageWrapper;

/* ============ Header ============ */
export const Header = styled.div`
  display: flex;
  align-items: center;

  .blur {
    transition: 0.5s;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 0;
    z-index: 1;
    &.show {
      border-top: 6px solid rgb(27, 50, 65);
      height: 100%;
      background-color: rgba(255, 255, 255);
    }
  }
`;
Header.Search = styled.div`
  flex: 1;
  margin-right: 12px;
  transition: 1s;
  z-index: 2;
`;
Header.AddButton = styled.button`
  width: 60px;
  height: 40px;
  background-color: rgb(27, 50, 65);
`;
