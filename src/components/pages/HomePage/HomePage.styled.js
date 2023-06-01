import styled, { css } from "styled-components";
import { media } from "lib/utils/style";

import ContainerAtom from "components/atoms/Container";

/* ============ Wrapper ============ */
const HomePageWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 20px;

  transition: 0.4s;
  animation-duration: 0.3s;
`;

export default HomePageWrapper;

export const Container = styled(ContainerAtom)`
  max-width: 1084px;
`;

/* ============ Header ============ */
export const Header = styled.div`
  display: flex;
  align-items: center;

  .blur {
    transition: 0.5s;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 0;
    z-index: 1;
    &.show {
      border-top: 6px solid rgb(27, 50, 65);
      height: 100%;
      background-color: rgba(255, 255, 255);
    }
  }
`;
Header.Search = styled.div`
  flex: 1;
  margin-right: 12px;
  transition: 1s;
  z-index: 2;
`;
Header.AddButton = styled.button`
  width: 60px;
  height: 40px;
  background-color: rgb(27, 50, 65);
`;

export const TopBannerW = styled.div`
  width: 100%;
  margin-top: -40px;

  display: flex;
  flex-direction: column;
  ${Container} {
    flex-direction: column;
  }

  h1,
  h3 {
    font-size: 20px;
    color: #143441;
  }
  h1 {
    margin: 105px 0 12px;
    font-weight: 800;
  }
  h3 {
    margin: 12px 0 24px;
    font-weight: 300;
  }
  ${media.tablet(css`
    h1 {
      margin: 105px 0 12px;
      font-size: 32px;
    }
    h3 {
      margin: 12px 0 24px;
      font-size: 32px;
    }
  `)};
`;

export const TagListW = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
