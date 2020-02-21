import styled, { css } from 'styled-components';

export const HeaderWrapper = styled.header`
  ${props => (props.transparent ? css`
    position: absolute;
    border-top: 0;
  ` : css`
    position: fixed;
    border-top: 6px solid rgb(27, 50, 65);
  `)}
  top: 0;
  left: 0;
  width: 100%;
  height: 55px;
  transition: 0.4s;
  z-index: 1000;
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
    border-bottom: 0;
  ` : css`
    background: #fff;
  `)};
`;

HeaderWrapper.Auth = styled.section`
  color: ${props => (props.transparent ? 'white' : '#363636')};
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
    margin-left: 24px;

    ${props => (props.transparent ? css`
      background: rgba(255, 255, 255, 0.15);
      border: 1px solid #FFFFFF;
      color: white;
      &:hover {
        background-color: white;
        color: #143441;
      }
    ` : css`
      background: white;
      border: 1px solid #143441;
      color: #143441;
      &:hover {
        background-color: #143441;
        color: white;
      }
    `)}
  }
  
  @media (max-width: 910px) {
    p { display: none }
    button { margin-left: 12px }
  }
`;
