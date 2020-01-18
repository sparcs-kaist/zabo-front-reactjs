import styled from 'styled-components';

export const PageWrapper = styled.div`
  padding-top: 64px;
  padding-bottom: 74px;
`;

PageWrapper.Contents = styled.div`
  padding: 0 15%;
`;

export const TitleStyle = styled.section`
  div {
    display: inline-block;
  }

  p {
    display: inline-block;
    vertical-align: middle;
  }

  img {
    width: 24px;
    height: 24px;
    vertical-align: middle;
    margin: 0 8px;
  }
`;

export const FooterStyle = styled.div`
  display: flex;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  border-top: 1px solid black;
  height: 74px;
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
    background: #EE726B;
    font-weight: bold;
    color: #FFFFFF;  
    &:disabled {
      background: #cccccc;
      cursor: not-allowed;
    }
  }
`;
