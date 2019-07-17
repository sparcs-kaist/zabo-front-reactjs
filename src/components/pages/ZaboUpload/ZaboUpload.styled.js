import styled from "styled-components"

const ZaboUploadWrapper = styled.div`
  @font-face {
    font-family: "Nanum Square";
    src: url(//cdn.rawgit.com/hiun/NanumSquare/master/nanumsquare.css);
  }

  /* ====== body ====== */
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Nanum Square';
  
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
  // adjustment of container width/padding
  //.zabo-expiration > .container, .posterContainer {
  //  width: 320px;
  //  padding: 6px 10px;
  //}
  
  /* ====== top ====== */
  .topline {
    margin-bottom: 10px;
    
    width: 100%;
    height: 5px;
    background-color: #143441;
  }
  
  .header {
    width: 320px;
    
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
    height: 524px;
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
  
  .slick-track {
    width: 100px !important;
    translate3d: none !important; 
  }
  .slick-slide {
    width: 320px !important;
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
    font-family: 'Nanum Square';
  }
  
  /* ====== submit ====== */
  .submit > button {
    margin: 0px 10px 20px 10px;
    width: 320px;
    height: 40px;
    font-size: 16px;
    font-family: 'Nanum Square';
    border-radius: 4px;
    color: white;
    background-color: #143441;
    box-shadow: 0px 3px 6px;
  }
`;

export default ZaboUploadWrapper;
