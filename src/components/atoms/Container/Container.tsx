import styled, { css } from "styled-components";

import { colors } from "lib/theme";
import { media } from "lib/utils/style";

const ContainerComponent = styled.div<{
  ownStyle?: ReturnType<typeof css>;
  background?: keyof typeof colors;
}>`
  width: 100%;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  overflow: scroll;

  &::-webkit-scrollbar {
    width: 0 !important;
  }

  -ms-overflow-style: none;
  ${media.tablet(css`
    padding: 0 18px;
  `)};
  ${(props) => props.ownStyle || ""};
  background: ${(props) => (props.background ? props.theme[props.background] : "transparent")};
`;

const PadComponent = styled.div<{ width?: number }>`
  padding-left: ${({ width = "24px" }) => width};
`;

const Container = Object.assign(ContainerComponent, { Pad: PadComponent });

export default Container;
