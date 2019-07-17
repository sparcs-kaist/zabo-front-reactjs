import styled from "styled-components"

const ZaboUploadWrapper = styled.div`
  @font-face {
    font-family: 'NanumSquare';
    src: url(//cdn.rawgit.com/hiun/NanumSquare/master/nanumsquare.css);
    //url(../../../lib/fonts/NanumSquareRegular.ttf) format('truetype');
  }

  /* ====== body ====== */
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'NanumSquare';
  
  /* ====== common styles ====== */
  section {
    margin: 0px 10px;
  }
  
  .label {
    margin-top: 20px;
    font-size: 12px;
    color: #8F8F8F;
  }
  
  .tag {
    font-size: 14px;
    margin: 6px 6px 0px 0px;
    padding: 5px 10px;
    border-radius: 3px;
  }
    // tag colors
    .default {
      color: #C5C5C5;
      background-color: #F4F4F4;
    }
    .selected {
      color: white;
      background-color: #143441;
    }
  
  .container {
    margin: 5px 0px;
    padding: 9px 10px;
    border-radius: 4px;
    
    width: 320px;
    background-color: #F4F4F4;
  }
  
  /* ====== top ====== */
  .topline {
    margin-bottom: 10px;
    
    width: 100%;
    height: 5px;
    background-color: #143441;
  }
  
  .header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  
  .upload_your_poster {
    margin: 10px 0px;
    font-size: 30px;
    font-weight: bold;
    color: #143441;
  }
  
  /* ====== inputs ====== */
  .posterContainer {
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .posterContainerResponsiveHeight {
    padding: 0; // 위의 컨테이너보다 나중 선언되어 적용
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .posterCarousel {
    width: 320px;
    text-align: center;
  }
  
  #posterInput {
    display: none;
  }
  
  .keywords {
    margin-bottom: 30px;
  }
  
  .tags {
    width: 320px;
    display: flex;
    flex-flow: row wrap;
  }
  
  .zabo-description > div > textarea,
  .zabo-title > div > textarea {
    font-family: 'NanumSquare';
  }
  
  /* ====== submit ====== */
  .submit > button {
    margin: 0px 10px 20px 10px;
    width: 320px;
    height: 40px;
    font-size: 16px;
    font-family: 'NanumSquare';
    border-radius: 4px;
    color: white;
    background-color: #143441;
    box-shadow: 0px 3px 6px;
  }
  
  
  /* ======================================== */
  /* ============= Reactive CSS ============= */
  /* ======================================== */
  @media (max-width: 759px) {
    /* ==== Common Styles ==== */
    overflow: scroll;
    .header, .inputs, .submit {
      padding: 0px 20px;
      width: 100%;
    }
    section {
      margin: 0;
      width: 100%;
    }
    
    /* ==== adjust width ==== */
    .container, .posterCarousel, .info, .tags {
      width: 100%;
    }
    .submit > button {
      width: 100%;
      margin: 0;
    }
  }
  @media (min-width: 760px) {
    /* ====== inputs ====== */
    .inputs {
      display: flex;
      flex-direction: row;
    }
    .posterContainer {
      height: 524px;
    }
    
    .header {
      width: 660px;
    }
   
    // ==== ReactSwipe ==== //
    .reactswipe {
      height: 480px !important;
    }
    .reactswipe > div > div {
      overflow: scroll;
    }
  }
`;

export default ZaboUploadWrapper;
