import styled from 'styled-components';

const ZaboUploadWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  /* ======= CommonStyle ======= */
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 880px;
  }
  // label on all inputs
  .label {
    margin-top: 20px;
    font-size: 12px;
    color: #8f8f8f;
  }
  // container for all inputs
  .inputContainer {
    width: 100%;
    margin: 5px 0px;
    padding: 9px 10px;
    border-radius: 4px;
    background-color: #f4f4f4;
  }

  /* ========= Header ========= */
  .header {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .headerTitle {
    margin: 10px 0px;
    font-size: 30px;
    font-weight: bold;
    color: #143441;
  }
  .zabo-uploader {
    margin-top: 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .zabo-uploader > img {
    margin-right: 3px;
  }
  select {
    display: inline-block;
    padding: 0.5em 2.5em 0.5em 0.3em;
    -webkit-appearance: none;
    -moz-appearance: none;
    border: none;
    font: inherit;

    background-color: white;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAA3klEQVRIS+3VMU9CMRTF8d8zBL+aizoQFhx0kUk33RzdYMNFXUFnYeGrYYyaJiUxJHDLSxodbNKpfeffc9/pbaPyaCrr+3OA++z4rtT5Pg5GuMnCY9yWQEoBE1xhlUUP8YDrCBIB0vojLvGO0yz4hm4JJAKcYYoPHGOZAUdYoIMBXrc5iQAHeMlzviFygj7O8dkWEJU4XI8chALRhn9AVKHf70VRTHu4wFfbmKZLNKt50dLBnna0imcMd/2I0phWa3Y/D1e1Xa9BCZJG0VuQNpaWKMx72xS1Fl5/WN3BN+AgJhnZQlq4AAAAAElFTkSuQmCC");
    background-position: calc(100% - 0.5rem), 100% 0;
    background-size: 1.5em 1.5em;
    background-repeat: no-repeat;
  }
  select:focus {
    outline: 0;
  }

  /* ========= Inputs ========= */
  .inputs {
    width: 100%;
  }
  // section: .zabo-poster //
  .zabo-poster > label > button {
    width: 130px;
    height: 30px;
    font-size: 13px;
    font-family: "NanumSquare";
    border-radius: 3px;
  }
  .posterCarousel {
    width: 100%;
    text-align: center;
  }
  .posterCarousel > div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  div.reactswipe {
    width: calc(100% - 50px); // bug fix: rendering small in mobile
  }
  div.reactswipe > div > div {
    width: calc(100% - 50px); // bug fix: rendering small in mobile
  }
  .slick-image {
    border: 5px solid #f4f4f4;
    border-radius: 4px;
  }
  .poster-delete {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  .carousel-navigations {
    margin: 5px 0px 10px 0px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .navigation {
    background-color: #f4f4f4;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    margin-right: 5px;
  }
  .navigation-selected {
    width: 11px;
    height: 5px;
    background-color: #143441;
    border-radius: 2.5px;
    margin-right: 5px;
  }

  .posterContainer {
    padding-top: 100%;
    position: relative;
    display: flex;
  }
  .posterContainer > img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .posterContainerResponsiveHeight {
    padding: 0; // 위의 컨테이너보다 나중 선언되어 적용
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #posterInput {
    display: none;
  }

  // div: .info //
  // section: zabo-title, zabo-description, zabo-expiration
  .zabo-description > div > textarea,
  .zabo-title > div > textarea,
  .zabo-expiration > div > div > div > input {
    font-family: "NanumSquare";
  }
  // section: zabo-keywords
  .zabo-keywords {
    margin-bottom: 30px;
  }
  .tags {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
  }
  .tag {
    font-size: 14px;
    margin: 10px 10px 0px 0px;
    padding: 4.5px 10px;
    border-radius: 3px;
  }
  .tag:hover {
    color: white;
    background-color: #143441;
  }
  .tag:active {
    opacity: 0.8;
    transform: translate3d(1px, 1px, 1px);
  }
  // tag colors
  .default {
    color: #c5c5c5;
    background-color: #f4f4f4;
  }
  .selected {
    color: white;
    background-color: #143441;
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
    font-family: "NanumSquare";
    border-color: #143441;
    border-radius: 4px;
    color: white;
    background-color: #143441;
    box-shadow: 0px 3px 6px;
  } // button 에는 margin-bottom 이 필요 없잖아.
  // 컴포넌트는 그 자체로만. Layout 은 감싸는 div 가 해결.
  .submit > button:hover {
    opacity: 0.9;
  }
  .submit > button:active {
    transform: translate3d(1px, 1px, 1px);
  }

  .loading-bar {
    margin: 24px 0;
    padding: 0 20px;
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
  @media (min-width: 0px) and (max-width: 800px) {
    .posterCarousel > div > button {
      // display: none; => only if touchable in mobile
    }
  }
  @media (min-width: 800px) {
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

    // ==== ReactSwipe ==== //
    .reactswipe {
      height: 480px !important;
      // 320:480 = 2:3
      // covers longer than most common poster size
      // A2 size 420:600 = 2:2.86
    }
    .slick-image {
      width: 320px;
    }
    .poster-delete {
      position: absolute;
      width: 320px;
      left: 50%;
      transform: translateX(-50%);
      padding: 0px 10px 0px 286px;
    }
    .navigation {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      margin-right: 6px;
    }
    .navigation-selected {
      width: 13px;
      height: 6px;
      border-radius: 3px;
      margin-right: 6px;
    }

    // === loading bar === //
    .loading-bar {
      width: 640px;
      padding: 0;
    }
  }
`;

export default ZaboUploadWrapper;
