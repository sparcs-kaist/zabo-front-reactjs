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
    
    width: 340px;
    background-color: #F4F4F4;
  }
  // adjustment of container width/padding
  .zabo-expiration > .container, .posterContainer {
    width: 320px;
    padding: 6px 10px;
  }
  
  /* ====== top ====== */
  .topline {
    margin-bottom: 10px;
    
    width: 100%;
    height: 5px;
    background-color: #143441;
  }
  
  .header {
    width: 340px;
    
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
    height: 485px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .keywords {
    margin-bottom: 30px;
  }
  
  .tags {
    width: 340px;
    display: flex;
    flex-flow: row wrap;
  }
  
  .zabo-explanation > div > textarea,
  .zabo-title > div > textarea {
    font-family: 'Nanum Square';
  }
  
  /* ====== submit ====== */
  .submit > button {
    margin: 0px 10px 20px 10px;
    width: 340px;
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
