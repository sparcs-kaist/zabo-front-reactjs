import styled from 'styled-components';

const InfoFormWrapper = styled.div`
  padding-bottom: 60px;
  /*label on all inputs*/
  .label {
    font-size: 18px;
    font-weight: bold;
    color: #363636;
    &.label-tag { margin-bottom: 12px }
  }
  /*container for all inputs*/
  .inputContainer {
    width: 100%;
    margin: 8px 0 18px 0;
    padding: 10px 16px;
    border-radius: 4px;
    background-color: #f4f4f4;
    input {
      padding: 0;
    }
  }

  .oneLineInput {
    height: 38px;
  }

  /* ========= Inputs ========= */
  .inputs {
    width: 100%;
  }
  /*section: .zabo-poster //*/

  /*// div: .info //
  // section: zabo-title, zabo-description, zabo-expiration*/
  .zabo-description > div > textarea,
  .zabo-title > div > textarea,
  .zabo-expiration > div > div > div > input {
    font-family: "NanumSquare", sans-serif;
  }
  /*// section: zabo-keywords*/
  .zabo-keywords {
    margin-bottom: 30px;
  }
  .tags {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
  }
  .tag {
    font-size: 16px;
    line-height: 18px;
    margin: 0 8px 8px 0;
    padding: 10px 14px;
    border-radius: 4px;
    cursor: pointer;
  }
  .tag:hover {
    color: white;
    background-color: #143441;
  }
  .tag:active {
    opacity: 0.8;
    transform: translate3d(1px, 1px, 1px);
  }
  /*// tag colors*/
  .default {
    color: #143441;
    border: solid 1px #143441;
  }
  .selected {
    color: white;
    background-color: #143441;
    border: solid 1px #143441;
  }

  /* ========== Submit ========== */
  .submit {
    width: 100%;
    margin-bottom: 20px;
    text-align: center;
  }
  
  .submit > button {
    width: 100%;
    height: 40px;
    font-size: 16px;
    font-family: "NanumSquare", sans-serif;
    border-color: #143441;
    border-radius: 4px;
    color: white;
    background-color: #143441;
    box-shadow: 0px 3px 6px;
  } /*// button 에는 margin-bottom 이 필요 없잖아.
  // 컴포넌트는 그 자체로만. Layout 은 감싸는 div 가 해결.*/
  .submit > button:hover {
    opacity: 0.9;
  }
  .submit > button:active {
    transform: translate3d(1px, 1px, 1px);
  }

  .loading-bar {
    margin: 24px 0;
    padding: 0 16px;
    width: 100%;
    display: flex;
    .loading-active {
      width: 0;
      border-top: 5px solid pink;
    }
    .loading-inactive {
      flex: 1;
      border-top: 5px solid gainsboro;
    }
  }

  /* ======================================== */
  /* ============ Responsive CSS ============ */
  /* ======================================== */
  @media (min-width: 640px) {
    .label.label-tag { margin-bottom: 8px }
    .tag { margin: 0 12px 10px 0 }
    .headerLow {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }

    /* ==== adjust position into two columns ==== */
    .inputs {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    section.zabo-poster,
    div.info,
    .submit > button {
      width: calc(50% - 10px);
    }
    .posterContainer {
      height: 524px;
    }

    /*// === loading bar === //*/
    .loading-bar {
      width: 640px;
      padding: 0;
    }
  }
`;

InfoFormWrapper.Header = styled.section`
  h1 {
    margin: 20px 0 16px 0;
    font-size: 28px;
    line-height: 32px;
    color: #363636;
    font-weight: 800;
  }
  p {
    color: #202020;
    padding-bottom: 36px;
    margin: 0;
  }
  @media (max-width: 640px) {
    h1 {
      margin: 24px 0 12px 0;
      font-size: 24px;
    }
    p { padding-bottom: 40px }
  }
`;

InfoFormWrapper.TwoCol = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  min-height: 70vh;
  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

InfoFormWrapper.TitleImage = styled.section`
  flex: 1;
  height: 100%;
  margin-right: 48px;
  background-color: #F4F4F4;
  border-radius: 8px;
  padding: 12px;
  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
  @media (max-width: 640px) {
    border-radius: 4px;
    margin: 0;
    img {
      border-radius: 4px;
    }
  }
`;

InfoFormWrapper.Info = styled.section`
  flex: 1;
  height: 100%;
  input.title-input {
    width: 100%;
    height: 38px;
    margin: 8px 0 18px 0;
    padding: 11px 16px;
    border-radius: 4px;
    background-color: #F4F4F4;
    color: #202020;
    border: 0;
    outline: none;
    font-size: 14px;
    &::placeholder {
      color: #8F8F8F;
    }
  }
  @media (max-width: 640px) {
    margin-top: 24px;
  }
`;

InfoFormWrapper.Editor = styled.section``;

export {
  InfoFormWrapper,
};
