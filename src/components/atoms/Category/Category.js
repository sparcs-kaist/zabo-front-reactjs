import styled, { css } from "styled-components";

import * as mixins from "lib/mixins";
import { media } from "lib/utils/style";

export const CategoryW = styled.div`
  ${mixins.flexCenter};
  height: 19px;
  padding: 3px 6px;
  background: ${(props) => props.theme.gray5};
  border-radius: 2px;
  font-size: 10px;
  line-height: 11px;
  color: ${(props) => props.theme.gray60};
  cursor: default;
  ${media.tablet(css`
    font-size: 12px;
    line-height: 14px;
    height: 20px;
  `)};
`;

export const CategoryListW = styled.div`
  display: flex;
  ${CategoryW} {
    margin-right: 4px;
    &:last-child {
      margin-right: 0;
    }
  }
`;
