import styled, { css } from "styled-components";

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
  margin-bottom: 64px;
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
    p {
      padding-bottom: 32px;
    }
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
  label {
    display: inline-block;
  }
  button,
  .button {
    height: 30px;
    font-size: 12px;
    font-weight: bold;
    line-height: 12px;
    margin: 18px 0 48px 0;
    padding: 8px 12px;
    border-radius: 15px;
    border: 1px solid #143441;
    background-color: #f8f8f8;
    cursor: pointer;
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
    button,
    .button {
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
    margin: 8px 0 28px 0;
    border: none;
    outline: none;
    border-radius: 4px;
    background-color: #f4f4f4;
    font-size: 16px;
    line-height: 16px;
    font-weight: 500;
    color: #363636;
    &::placeholder {
      font-weight: 300;
      color: #8f8f8f;
    }
    /* &:focus {
      background-color: #ffffff;
      border: 1px solid #143441;
    } */
  }
  @media (max-width: 640px) {
    width: 100%;
  }
`;

FormGroup.Label = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  margin: 0;
  ${(props) =>
    props.required
      ? css`
          &::after {
            display: inline-block;
            margin-left: 4px;
            color: #f66;
            font-weight: 300;
            content: "*";
          }
        `
      : css``};
`;

export const FooterStyle = styled.div`
  width: 100%;
  max-width: 1080px;
  display: flex;
  justify-content: flex-end;
`;

export const Submit = styled.button`
  width: 140px;
  height: 44px;
  border-radius: 4px;
  font-size: 16px;
  line-height: 18px;
  color: white;
  background-color: #ff5d5d;
  border: 0;
  &:disabled {
    background: #f8f8f8;
    color: #8f8f8f;
    cursor: not-allowed;
  }
`;

export const Success = styled.div`
  color: green;
`;
export const ErrorComponent = styled.div`
  color: red;
`;

export const AddMember = styled.section`
  display: flex;
  > div {
    margin-right: 8px;
  }
  > button {
    width: 78px;
    height: 38px;
    background: #143441;
    border: 1px solid #143441;
    box-sizing: border-box;
    border-radius: 4px;

    font-weight: bold;
    font-size: 16px;
    line-height: 18px;
    color: #ffffff;
  }
`;

export const AddCategoryW = styled.section`
  display: flex;
  margin: 8px 0 48px 0;

  > div {
    max-width: 50%;
  }
  > div:first-child {
    margin-right: 14px;
  }

  @media (max-width: 640px) {
    > div:first-child {
      margin-right: 15px;
    }
  }
`;

// TODO: temporal code - need to change
export const BusinessW = styled.section`
  width: 99%;
  height: 90px;
  transition: max-height 0.3s ease-in-out;
  padding: 0 29px;
  margin: 30px 0 48px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3);
  border-left: 5px solid #143441;
  border-radius: 2px;
  .header {
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .header-title {
      display: flex;
      flex-direction: column;
    }
    h3 {
      color: #363636;
      font-size: 16px;
      font-weight: bold;
      margin: 0 0 8px;
      padding: 0;
    }
    p {
      color: #8f8f8f;
      font-size: 12px;
      padding: 0;
    }
    .business-btn {
      flex: 1;
      text-align: right;
      button {
        cursor: not-allowed;
        display: inline-flex;
        align-items: center;
        justify-content: flex-end;
        width: 144px;
        height: 38px;
        background-color: #f4f4f4;
        border-radius: 4px;
        color: #8f8f8f;
        font-size: 16px;
        font-weight: bold;
        border: 0;
        img {
          width: 20px;
          height: 20px;
          margin: 0 3px 0 8px;
        }
      }
    }
  }
  @media (max-width: 640px) {
    height: 178px;
    .header {
      height: 178px;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      p {
        margin-bottom: 36px;
      }
      .business-btn {
        flex: none;
      }
    }
  }
`;
