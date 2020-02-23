import styled from 'styled-components';

export const Page = styled.div`
  min-width: 1072px;
  padding: 48px 0;
  @media (max-width: 640px) {
    min-width: 100%;
    padding: 28px 0;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
`;

Page.Body = styled.div`
  width: 1032px;
  div.empty-page {
    margin-top: 230px;
    text-align: center;
    font-size: 16px;
    img {
      width: 29.15px;
      height: 29.15px;
      margin-bottom: 34px;
    }
    div.empty-text {
      color: #202020;
      margin-bottom: 40px;
      .empty-query {
        display: inline-block;
        font-weight: 800;
      }
    }
    p {
      color: #BCBCBC;
      line-height: 28px;
      margin: 0
    }
  }
  @media (max-width: 640px) {
    width: 100%;
    div.empty-page { margin-top: 74px }
    img.search-icon { margin-bottom: 22px }
    div.empty-text { margin-bottom: 44px }
  }
`;

// TODO: Refactor dups
export const Zabos = styled.section` 
  width: 1032px;
  h1 {
    display: inline-block;
    font-size: 22px;
    font-weight: 800;
    color: #363636;
    margin: 0;
  }
  div.empty-page { margin-top: 101px }
  .emptySpace { margin-top: 8px }
  @media (max-width: 640px) {
    margin-top: 38px;
    width: 100%;
    h1 {
      font-size: 18px;
      padding: 0 16px;
    }
    .emptySpace { margin-top: 0 }
  }
`;

Zabos.Result = styled.div`
  @media (max-width: 640px) {
    padding: 0 16px;
  }
`;
