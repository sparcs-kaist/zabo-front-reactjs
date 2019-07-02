import styled from "styled-components"

const ZaboUploadWrapper = styled.div`
  /* ====== body ====== */
  margin: 0;
  padding: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  width: 100%;
  background-color: #efefef;
  
  /* ====== Upload Section ====== */
  #uploadSection {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  
    width: 1024px;
    height: 650px;
    margin: 30px;
    padding: 40px;
    border-radius: 10px;
    background-color: white;
  }
  #imageUpload {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  
    width: 400px;
    height: 590px;
    padding: 20px;
    
    background-color: #efefef;
    border-radius: 20px;
  }
  #imageUploadInput {
    opacity: 0;
    
    width: 360px;
    height: 550px;
    
    position: absolute;
  }
  #imageUploadText {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    width: 360px;
    height: 550px;
    
    border: 2px dashed #2255;
    border-radius: 20px;
  }
  #informationUpload {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    
    width: 500px;
    height: 590px;
  }
  #title, #uploader, #description, #expiration {
    width: 100%;
    
  }
  #title {
    height: 50px;
  }
  
  /* ===== Submit Section ====== */
  #submitSection {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    margin-bottom: 30px;
    width: 100%;
  }
`;

export default ZaboUploadWrapper;
