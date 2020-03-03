import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import ProfileStats from 'organisms/ProfileStats';

import * as mixins from 'lib/mixins';
import { media } from 'lib/utils/style';

export const GroupW = styled (Link)`
  display: flex;
  align-items: center;
  min-width: 275px;
  height: 108px;
  border-radius: 6px;
  margin-right: 14px;
  padding: 24px 12px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3);
  &:last-child {
    margin-right: 0;
  }
  
  img {
    width: 70px;
    height: 70px;
    margin-right: 12px;
    border-radius: 50%;
  }

  ${media.tablet (css`
    min-width: 299px;
    height: 126px;
    padding: 28px 14px;
    img {
      width: 60px;
      height: 60px;
      margin-right: 14px;
    }
  `)};
  ${props => (props.isPending ? css`
    background: ${props => props.theme.gray10};
    &:hover {
      cursor: not-allowed;
    }
  ` : '')};
`;

export const GroupAW = styled (Link)`
  ${mixins.flexCenter};
  flex-direction: column;
  border-radius: 6px;
  min-width: 275px;
  height: 108px;
  padding: 24px 12px;
  background: ${props => props.theme.gray3};

  img {
    width: 24px;
    height: 24px;
  }
  p {
    font-size: 12px;
    padding: 0;
    margin: 8px 0 0 0;
    color: ${props => props.theme.gray50};
  }

  ${media.tablet (css`
    min-width: 297px;
    height: 126px;
    
    img {
      width: 20px;
      height: 20px;
    }
    p {
      font-size: 14px;
    }
  `)}
`;

export const GroupSW = styled (GroupW)`
  width: 100%;
  height: 72px;
  padding: 12px 16px;
  ${media.tablet (css`
    height: 92px;
    padding: 16px 24px;
  `)};
  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    margin-right: 12px;
  }
  ${media.tablet (css`
    width: 100%;
    img {
      width: 60px;
      height: 60px;
      margin-right: 20px;
    }
  `)};
`;

export const WritingsW = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const ProfileStatsW = styled (ProfileStats)`
  margin-top: 14px;
  ${media.tablet (css`
    margin-top: 12px;
  `)};
`;

export const NameW = styled.div`
  width: 100%;
  font-size: 18px;
  color: #143441;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  font-weight: 800;
  ${media.tablet (css`
    font-size: 16px;
  `)};
`;

export const SubtitleW = styled.div`
  font-size: 10px;
  line-height: 11px;
  color: ${props => props.theme.gray100};
  margin-top: 4px;
  ${media.tablet (css`
    font-size: 12px;
    line-height: 14px;
  `)};
`;
