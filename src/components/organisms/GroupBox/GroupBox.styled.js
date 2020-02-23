import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { media } from 'lib/utils/style';

export const GroupW = styled (Link)`
  display: flex;
  width: 297px;
  height: 126px;
  border-radius: 6px;
  margin-right: 14px;
  padding: 28px 14px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3);
  &:last-child {
    margin-right: 0;
  }
  
  img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    margin-right: 14px;
  }

  @media (max-width: 640px) {
    width: 247px;
    height: 108px;
    padding: 24px 12px;
    img {
      width: 60px;
      height: 60px;
      margin-right: 12px;
      border-radius: 50%;
    }
  }
`;

export const WritingsW = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const NameW = styled.div`
  width: 100%;
  font-size: 18px;
  color: #143441;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  margin: 0 0 14px 0;
  font-weight: 800;
  ${media.tablet (css`
    font-size: 16px;
    margin: 0 0 12px 0;
  `)};
`;
