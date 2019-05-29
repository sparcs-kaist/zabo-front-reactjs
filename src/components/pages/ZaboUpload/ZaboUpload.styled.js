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
  #zaboUploadWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    
    background-color: #efefef;
  }
  
  /* ===== Upload Section ===== */
  #uploadSection {
    display: flex;
    flex-direction: row;
  
    width: 1024px;
    height: 650px;
    padding: 30px;
  }
  #imageUpload {
    width: 400px;
    height: 590px;
  }
  #informationUpload {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    width: 500px;
    height: 590px;
  }
  
  /* ===== Submit Section ===== */
  #submitSection {
    width: 1024px;
    height: 100px;
  }
`;

export default ZaboUploadWrapper
