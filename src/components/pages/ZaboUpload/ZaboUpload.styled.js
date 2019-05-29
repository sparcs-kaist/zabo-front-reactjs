import styled from "styled-components"

const ZaboUploadWrapper = styled.div`
  * {
    margin: 0;
    padding: 0;
   }
   
   // @font-face {
   //  font-family: ~~;
   //  src: url("../lib~ /font.ttf");
   // }
  
  /* ===== Main Section ===== */
  .zaboUploadWrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    width: 100%;
    height: 100%;
    background-color: #efefef;
  }
  
  /* ===== Upload Section ===== */
  #uploadSection {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  
    width: 1024px;
    height: 650px;
    padding: 30px;
    border-radius: 10px;
  }
  #imageUpload {
    width: 400px;
    height: 590px;
    
    border: 1px solid gray;
  }
  #informationUpload {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    
    width: 500px;
    height: 590px;
    
    border: 1px solid gray;
  }
  
  /* ===== Submit Section ===== */
  #submitSection {
    width: 100%;
  }
`;

export default ZaboUploadWrapper
