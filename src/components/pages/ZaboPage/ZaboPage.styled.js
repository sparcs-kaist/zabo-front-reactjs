import styled, { css } from 'styled-components';

const ZaboPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  .container {
    padding: 0;
  }
`;

export default ZaboPageWrapper;

export const Zabo = styled.div`
  position: relative;
  margin: 0 auto 0 auto;
  width: 100%;
`;

Zabo.Poster = styled.div`
  background-color: lightgrey;
  display: flex;
  justify-content: center;
  box-shadow: 0px -1px 6px #a9a9a9;
  img {
    ${props => {
    const { meta } = props;
    if (!meta) {
      return css`
         width: auto;
         height: 50vh;
      `;
    }
    const { width, height } = meta;
    if (width > 1.7 * height) {
      return css`
          width: 100%;
          height: auto;
        `;
    }
    return css`
          width: auto;
          height: 50vh;
        `;
  }};
  }
`;
Zabo.Writings = styled.div`
 /*TODO: 아래 패딩 10px 늘림 / 폰트 너무 작아 / font-weight - 근용이 확인*/
  color: #143441;
  padding: 0 12px;

  .title {
    color: #143441;
    font-size: 24px;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 15px;
  }
  .owner {
    color: #8f8f8f;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 15px;
  }
  .times {
    display: flex;
    justify-content: space-between;
    width: 100%;
    a {
      max-width: calc(100% - 30px);
    }
    .after-create {
      flex: 1;
      font-size: 12px;
      line-height: 14px;
      color: #8F8F8F;
    }
    .due-date {
      width: 27px;
      height: 15px;
      flex-shrink: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #143441;
      border-radius: 2px;
      font-style: normal;
      font-weight: bold;
      font-size: 8px;
      line-height: 9px;
      color: #FFFFFF;
    }
  }
  .description {
    color: #143441;
    font-size: 14px;
    font-family: "NanumSquareRegular", sans-serif;
    line-height: 18px;
    margin-top: 15px;
    margin-bottom: 15px;
  }

  hr {
    border: 1px solid #F4F4F4;
  }

  .keyword-result {
    padding: 0px;
    width: 100%;
    li {
      border-radius: 2px;
      display: inline-block;
      padding: 4.5px 10px 4.5px 10px;
      margin-right: 10px;
      margin-top: 10px;
      background: #CECCB7;
      color: #ffffff;
      font-size: 14px;
      line-height: 16px;
      font-weight: bold;
    }
  }
`;
