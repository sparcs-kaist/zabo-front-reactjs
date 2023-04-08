import styled, { type css } from "styled-components";

const FooterWrapper = styled.footer<{
  ownStyle?: ReturnType<typeof css>;
}>`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 74px;
  background: white;
  z-index: 1000;

  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
  @media (max-width: 640px) {
    height: 60px;
  }
  ${(props) => props.ownStyle || ""};
`;

export default FooterWrapper;
