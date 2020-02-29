import styled, { css } from 'styled-components';

import { media } from 'lib/utils/style';

export const Page = styled.div`
  min-width: 1072px;
  padding: 48px 0;
  @media (max-width: 640px) {
    min-width: 100%;
    padding: 28px 0;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
`;

Page.Body = styled.div`
  width: 1032px;
  h1 {
    display: inline-block;
    font-size: 22px;
    font-weight: 800;
    color: #363636;
    margin: 0;
  }
  .emptySpace { margin-top: 8px }
 
  @media (max-width: 640px) {
    width: 100%;
    margin-top: 12px;
    padding: 0 16px;
    h1 {
      font-size: 18px;
    }
    .emptySpace { margin-top: 0 }
  }
`;

export const EmptyResultW = styled.section`
  text-align: center;
  font-size: 16px;
  margin-top: ${props => (props.isZaboEmpty ? '90px' : '225px')};
  img {
    width: 29.15px;
    height: 29.15px;
  }
  div.empty-text {
    color: #202020;
    margin-bottom: 40px;
    .empty-query {
      display: inline-block;
      font-weight: 800;
    }
  }
  .search-icon { margin-bottom: 22px }
  .empty-text { margin-bottom: 44px }
  p {
    color: #BCBCBC;
    line-height: 28px;
    margin: 0
  }

  @media (max-width: 640px) { margin-top: 97px }
  ${media.tablet (css`
    img {
      margin-bottom: 34px;
    }
  `)};
`;

// TODO: Refactor dups
export const ZaboResultW = styled.section` 
  width: 100%;
  margin-top: ${props => (props.isGroupEmpty ? '0' : '68px')};
  ${media.tablet (css`
    width: 1032px;
  `)};
`;

export const GroupResultW = styled.section``;
