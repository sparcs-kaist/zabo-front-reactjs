import styled, { css } from 'styled-components';

import landingBackground from 'static/images/landingBackground.png';

const Wrapper = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Banner = styled.div`
  margin: -55px 0 30px;
  padding: 50px 0 0;
  width: 100%;
  background-color: rgb(13,26,31);
  background-image: url(${landingBackground});
  background-repeat: no-repeat;
  background-size: cover;
  height: 520px;

  display: flex;
  flex-direction: column;
  
  .header-body {
    margin-left: max(116px, 14%);
    h1 {
      color: white;
      margin: 105px 0 0;
      font-size: 32px;
      font-weight: 800;
    }
    h3 {
      color: white;
      margin: 12px 0 98px;
      font-size: 32px;
      font-weight: 300;
    }
    a { display: inline-block }
    button {
      height: 52px;
      border: 1px solid #FFFFFF;
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.15);
      font-size: 16px;
      color: white;
      padding: 0 16px;
      display: flex;
      align-items: center;
      img {
        margin-left: 8px;
        width: 24px;
        height: 24px;
      }
    }
  }
  @media (max-width: 640px) {
    height: 349px;
    padding: 0 24px;
    .header-body {
      margin: 0;
      h1, h3 { font-size: 20px }
      button {
        height: 40px;
        font-size: 14px;
        padding: 0 14px;
        img {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
`;

export const ZaboListContainer = styled.section`
  width: 100%;
  @media (max-width: 640px) {
    padding: 0 16px;
  }
`;

export default Wrapper;
