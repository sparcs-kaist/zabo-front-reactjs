import styled, { css } from 'styled-components';

const InfoFormWrapper = styled.div`
  padding-bottom: 40px;
  /*label on all inputs*/
  .label {
    font-size: 18px;
    font-weight: bold;
    color: #363636;
    &.label-tag { margin-bottom: 12px }
    &.small { font-size: 16px }
  }
  .semi-label {
    font-size: 16px;
    color: #8F8F8F;
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
  // section: zabo-title, zabo-description, zabo-schedule*/
  .zabo-description > div > textarea,
  .zabo-title > div > textarea,
  .zabo-schedule > div > div > div > input {
    font-family: "NanumSquare", sans-serif;
  }
  /* section: zabo-keywords */
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
  input.title-input, input.schedule-title-input {
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
  input::placeholder {
    font-size: 14px;
    color: #202020;
  }
`;

InfoFormWrapper.Info.Schedule = styled.section`
  width: 99%;
  ${props => (props.hasSchedule ? css`
    height: 100%;
  ` : css`
    height: 72px;
  `)};
  padding: 0 29px;
  margin: 30px 0 48px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3);
  border-left: 5px solid #143441;
  border-radius: 2px;
  .header {
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    p {
      color: #363636;
      font-size: 16px;
      font-weight: bold;
      margin: 0;
    }
    .toggle-btn {
      flex: 1;
      text-align: right;
    }
  }

  .body {
    margin-top: 38px;
    padding-bottom: 36px;
    ${props => (props.hasSchedule ? css`
      visibility: visible;
      opacity: 1;
  ` : css`
      visibility: hidden;
      opacity: 0;
  `)};
    transition: visibility 0s, opacity 0.5s linear;
  }
  .body-container {
    display: flex;
    div {
      &.schedule-title {
        flex: 2;
        margin-right: 16px;
      }
      &.schedule-type {
        flex: 1;
      }
    }
  }
  .preview {
    margin-top: 60px;
    .schedule-preview-box {
      margin-top: 8px;
      padding: 24px 32px;
      border: 1px solid #E9E9E9;
      border-radius: 4px;
      h3, p {
        margin: 0;
      }
      h3 {
        font-size: 20px;
        font-weight: 800;
        border-bottom: 1px solid #636363;
        min-width: 50px;
        line-height: 24px;
        display: inline-block;
        ${props => (props.hasTitle ? css`
          color: #363636;
        ` : css`
          color: #D2D2D2;
        `)}
      }
      p {
        font-size: 16px;
        margin: 6px 0 22px;
      }
      .timestamp-box {
        display: inline-block;
        padding: 8px 10px;
        color: white;
        background-color: #143441;
        border-radius: 4px;
        font-size: 14px;
      }
    }
  }
`;

InfoFormWrapper.Editor = styled.section``;

export {
  InfoFormWrapper,
};
