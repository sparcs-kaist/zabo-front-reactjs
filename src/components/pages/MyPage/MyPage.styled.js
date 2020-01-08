import styled from 'styled-components';

const MyPageWrapper = styled.div`
  animation-duration: 0.3s;

  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

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
  @media (min-width: 0px) and (max-width: 530px) {
    //.container width auto with padding
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
  }
`;

export default MyPageWrapper;

/* ============ Header ============ */
export const Header = styled.div`
  width: 100%;
`;
Header.Head = styled.div`
  margin: 14px 0px;

  display: flex;
  flex-direction: column;

  div:nth-child(1) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .page-title {
    font-size: 24px;
    font-family: NanumSquareExtraBold;
    font-weight: 900;
    color: #143441;
  }
  .page-done {
    font-size: 16px;
    font-family: NanumSquare;
    font-weight: bold;
    color: #8f8f8f;
  }
  .page-explanation {
    margin-top: 5px;
    font-size: 12px;
    font-family: NanumSquare;
    color: #8f8f8f;
  }
`;

/* ======== User ========= */
export const User = styled.div`
  width: 100%;
  margin-top: 29px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 76px;
    height: 76px;
  }

  .user-name {
    font-size: 20px;
    margin-top: 8px;
    font-family: NanumSquare;
    font-weight: 700;
    color: #143441;
  }

  @media (min-width: 530px) {
    margin-top: 34px;

    img {
      width: 90px;
      height: 90px;
    }

    .user-name {
      margin-top: 20px;
      font-size: 22px;
    }
  }
`;

/* ======== Groups ========= */
export const Groups = styled.div`
  width: 100%;
  margin: 8px 0px 72px 0px;

  div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
  }

  .group-selector {
    font-size: 16px;
    font-weight: bold;
    color: #8f8f8f;
    display: flex;
    flex-flow: column;
    align-items: start;
    width: fit-content;
    cursor: pointer;
    :hover {
    }
  }

  .group-name {
    display: flex;
    align-items: center;
    flex-flow: row;
  }

  .selector {
    margin-left: 2px;
    font-family: NanumSquare;
    width: fit-content;
  }

  .group-dropdown {
    font-family: NanumSquare;
    font-size: 16px;
    font-weight: bold;
    color: #8f8f8f;
    cursor: pointer;
    width: fit-content;
    flex-flow: column;
    align-items: start;
    z-index: 500;
  }

  .group-dropdown-name {
    padding: 5px 0;
  }

  .group-control {
    margin: 3px 0px 0px 10px;
    font-size: 16px;
    font-family: NanumSquare;
    font-weight: bold;
    color: #8f8f8f;
  }

  @media (min-width: 530px) {
    margin: 20px 0px 80px 0px;
  }
`;
