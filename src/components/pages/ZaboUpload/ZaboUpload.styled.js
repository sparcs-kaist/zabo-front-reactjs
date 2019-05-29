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
    justify-content: center;
    align-items: center;
  
    width: 1024px;
    height: 650px;
    padding: 40px;
    border-radius: 10px;
    background-color: white;
  }
  #imageUpload {
    margin: 20px;
    width: 360px;
    height: 550px;
    
    border: 1px dotted black;
    border-radius: 10px;
  }
  #imageUploadInput {
    display: none;
  }
  .spacing {
    margin: 1px;
  }
  #informationUpload {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    
    margin: 20px;
    width: 460px;
    height: 550px;
  }
  
  /* ===== Submit Section ====== */
  #submitSection {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    width: 100%;
  }
`;

export default ZaboUploadWrapper;
