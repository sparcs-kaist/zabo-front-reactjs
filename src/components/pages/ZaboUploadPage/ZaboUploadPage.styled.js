import styled, { css } from 'styled-components';

export const PageWrapper = styled.div`
  padding-top: 48px;
  padding-bottom: 74px;
  min-width: 1072px;
  @media (max-width: 640px) {
    min-width: 100%;
    padding: 36px 16px;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
`;

PageWrapper.Contents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 1032px;
  height: 100%;
  @media (max-width: 640px) {
    width: 100%;
  }
`;

export const TitleStyle = styled.section``;

TitleStyle.elem = styled.div`
  display: inline-block;

  p {
    display: inline-block;
    vertical-align: middle;
    font-size: 16px;
    transition: color 0.3s;
    ${props => (props.step ? css`
        color: #143441;
        font-weight: bold;
    ` : css`
        color: #BCBCBC;
    `)}
  }
  img {
    width: 24px;
    height: 24px;
    vertical-align: middle;
    margin: 0 8px;
  }
  @media (max-width: 640px) {
    p { 
      font-size: 14px;
      margin: 0;
    }
    img {
      width: 16px;
      height: 16px;
      margin: 0 4px;
    }
  }
`;

export const FooterStyle = styled.div`
  display: inline-block;
  width: 100%;
  align-items: center;
  background: white;
  
  .container {
    width: 100%;
    max-width: 1080px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
  
  .slide-action-group {
    flex: auto 0 0;
  }
  
  button {
    width: 140px;
    height: 44px;
    border-radius: 4px;
    font-size: 16px;
    line-height: 18px;
  }
  .prev {
    border: none;
    color: #9C9C9C;
    margin-right: 24px;
  }
  .next {
    border: none;
    font-weight: bold;
    background: #143441;
    color: white;
    &:disabled {
      background: #F8F8F8;
      color: #8F8F8F;
      cursor: not-allowed;
    }
    /* isSubmit : step === 2 case */
    &.true {
      background: #FF5D5D;
    }
    &.true:disabled {
      background: #cccccc;
      color: #8F8F8F;
    }
  }

  @media (max-width: 640px) {
    button {
      width: 122px;
      height: 40px;
      font-size: 14px;
    }
  }
`;
