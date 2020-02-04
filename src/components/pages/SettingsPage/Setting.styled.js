import styled from 'styled-components';

export const Page = styled.section`
  padding: 64px 0 74px 0;
  min-width: 1072px;
  @media (max-width: 640px) {
    min-width: 100%;
    padding: 36px 16px 60px 16px;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
`;

Page.Body = styled.div`
  width: 1032px;
  h1 {
    margin: 0;
    padding-bottom: 16px;
    font-size: 28px;
    line-height: 32px;
    color: #363636;
    font-weight: 800;
  }
  p {
    margin: 0;
    padding-bottom: 36px;
    color: #202020;
  }
  @media (max-width: 640px) {
    width: 100%;
    h1 {
      padding-bottom: 12px;
      font-size: 24px;
      line-height: 27px;
    }
    p { padding-bottom: 32px }
  }
`;

Page.Body.ProfileInfo = styled.div`
  display: inline-block;
  text-align: center;
  img {
    width: 120px;
    height: 120px;
    display: block;
    border-radius: 50%;
  }
  button {
    height: 30px;
    font-size: 12px;
    font-weight: bold;
    line-height: 12px;
    margin: 18px 0 48px 0;
    padding: 8px 12px;
    border-radius: 15px;
    border: 1px solid #143441;
    background-color: #F8F8F8;
    /* &:hover {
      background-color: #143441;
      color: #F8F8F8;
    } */
  }
  @media (max-width: 640px) {
    img {
      width: 105px;
      height: 105px;
    }
    button {
      margin: 12px 0 32px 0;
    }
  }
`;

export const FormGroup = styled.div`
  width: 582px;
  input {
    font-family: "NanumSquare", sans-serif;
    width: 100%;
    height: 38px;
    padding: 10px 16px;
    margin: 8px 0 18px 0;
    border: none;
    outline: none;
    border-radius: 4px;
    background-color: #F4F4F4;
    font-size: 16px;
    line-height: 16px;
    font-weight: bold;
    color: #363636;
  }
  @media (max-width: 640px) {
    width: 100%;
  }
`;

FormGroup.Label = styled.div`
  font-weight: bold;
  font-size: 18px;
  line-height: 20px;
  margin: 0;
`;

export const Submit = styled.button`
  width: 140px;
  height: 44px;
  border-radius: 4px;
  font-size: 16px;
  line-height: 18px;
  color: white;
  background-color: #FF5D5D;
`;

export const Success = styled.div`
  color: green;
`;
export const Error = styled.div`
  color: red;
`;
