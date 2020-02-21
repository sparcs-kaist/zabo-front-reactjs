import styled, { css } from 'styled-components';

export const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 55px;
  transition: 0.4s;
  z-index: 1000;
  border-top: 6px solid rgb(27, 50, 65);
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom: 1px solid #E9E9E9;

  a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 14px;
    img {
      margin-right: 24px;
    }
  }
  
  ${props => (props.transparent ? css`
    background: transparent;
  ` : css`
    background: #fff;
  `)};
`;

HeaderWrapper.Auth = styled.section`
  a { 
    display: inline-block;
    &.upload { margin-left: 6px }
  }
  p {
    display: inline-block;
    margin: 0;
    padding-left: 6px;
    font-size: 14px;
  }
  button {
    font-family: "NanumSquare", sans-serif;
    height: 32px;
    font-size: 14px;
    font-weight: bold;
    line-height: 12px;
    padding: 8px 16px;
    border-radius: 4px;
    border: 1px solid #143441;
    color: #143441;
    margin-left: 24px;
    &:hover {
      background-color: #143441;
      color: white;
    }
  }
  
  @media (max-width: 910px) {
    p { display: none }
    button { margin-left: 12px }
  }
`;
