import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import ContainerAtom from 'atoms/Container';
import TwoCol from 'atoms/TwoCol';
import GroupBox from 'organisms/GroupBox';

import * as mixins from 'lib/mixins';
import { media } from 'lib/utils/style';

import educationIcon from 'static/icon/category/education.svg';
import eventIcon from 'static/icon/category/event.svg';
import festivalIcon from 'static/icon/category/festival.svg';
import groupIcon from 'static/icon/category/group.svg';
import performanceIcon from 'static/icon/category/performance.svg';
import scheduleIcon from 'static/icon/category/schedule.svg';
import seminarIcon from 'static/icon/category/seminar.svg';
import rightArrowIcon from 'static/icon/rightArrow.svg';
import landingBackground from 'static/images/landingBackground.png';

const categoryIcons = {
  educationIcon,
  eventIcon,
  festivalIcon,
  groupIcon,
  performanceIcon,
  scheduleIcon,
  seminarIcon,
  rightArrowIcon,
};

export const Container = styled (ContainerAtom)`
  max-width: 1084px;
`;

const Wrapper = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TitleW = styled.div`
  font-weight: 800;
  font-size: 20px;
  line-height: 23px;
  color: ${props => props.theme.gray90};
  ${media.tablet (css`
    margin-top: 0;
    font-size: 24px;
    line-height: 27px;
    margin-bottom: 32px;
  `)};
`;

export const TopBannerW = styled.div`
  margin: -55px 0 0;
  width: 100%;
  height: 349px;
  background-color: rgb(13,26,31);
  background-image
  : url(${landingBackground});
  background-repeat: no-repeat;
  background-size: cover;
  
  display: flex;
  flex-direction: column;
  ${Container} {
    flex-direction: column;
  }
  
  h1, h3 { 
    font-size: 20px;
    color: white; 
  }
  h1 {
    margin: 105px 0 0;
    font-weight: 800;
  }
  h3 {
    margin: 12px 0 98px;
    font-weight: 300;
  }
  a {
    width: 120px;
  }
  ${media.tablet (css`
    height: 520px;
    padding: 50px 0 0;
    h1 {
      margin: 105px 0 0;
      font-size: 32px;
    }
    h3 {
      margin: 12px 0 98px;
      font-size: 32px;
    }
    a {
      width: 140px;
    }
    button {
      height: 52px;
      font-size: 16px;
      padding: 0 16px;
      img {
        margin-left: 8px;
        width: 24px;
        height: 24px;
      }
    }
  `)};
`;

const whiteBtn = css`
  color: ${props => props.theme.white};
  border: 1px solid ${props => props.theme.white};
  background: rgba(255, 255, 255, 0.15);
`;

const mainBtn = css`
  color: ${props => props.theme.main};
  border: 1px solid ${props => props.theme.main};
  background: ${props => props.theme.white};
`;

const btnMixins = {
  white: whiteBtn,
  main: mainBtn,
};

export const ButtonW = styled.button`
  height: 40px;
  font-size: 14px;
  padding: 0 14px;
  border-radius: 4px;
  color: white;
  ${mixins.flexCenter};
  ${props => btnMixins[props.color]};
  svg {
    margin-left: 4px;
  }
  ${media.tablet (css`
    height: 52px;
    font-size: 16px;
    padding: 0 16px;
    svg {
      margin-left: 8px;
    }
  `)};
`;
ButtonW.propTypes = {
  color: PropTypes.oneOf (['white', 'main']).isRequired,
};

TopBannerW.Buttons = styled.section`
  display: flex;
  ${ButtonW} {
    margin-left: 12px;
  }
  ${media.tablet (css`
    ${ButtonW} {
      margin-left: 20px;
    }    
  `)};
  
  ${ButtonW}:first-child {
    margin-left: 0;
  }
`;

export const CategoryNavW = styled (Link)`
  cursor: pointer;
`;

CategoryNavW.Image = styled.div`
  background-image: ${props => css`
    url(${categoryIcons[`${props.category}Icon`]});
  `};
  width: 48px;
  height: 48px;
  background-size: 48px 48px;
  ${media.tablet (css`
    width: 72px;
    height: 72px;
    background-size: 72px 72px;    
  `)};
`;

CategoryNavW.Label = styled.div`
  color: ${props => props.theme.gray90};
  font-size: 12px;
  line-height: 14px;
  margin-top: 8px;
  text-align: center;
  ${media.tablet (css`
    font-size: 18px;
    line-height: 20px;
    font-weight: bold;
    margin-top: 18px;
  `)};
`;

export const CategoryBannerW = styled.section`
  width: 100%;
  display: flex;
  ${Container} {
    padding: 24px 16px;
  }
  ${CategoryNavW} {
    margin-right: 20px;
    &:last-child {
      margin-right: 0;
    }
  }
  ${media.tablet (css`
    padding: 72px 16px;
    ${CategoryNavW} {
      margin-right: 65px;
    }
  `)};
`;

CategoryNavW.Image.propTypes = {
  ...CategoryNavW.Image.propTypes,
  category: PropTypes.string.isRequired,
};

export const UpcomingW = styled.section`
  background: ${props => props.theme.gray90};
  color: ${props => props.theme.gray1};
  width: 100%;
  ${Container} {
    padding: 60px 24px 12px 24px;
  }
  ${TwoCol.Right} {
    position: relative;
    overflow: hidden;
  }
  ${media.tablet (css`
    padding: 72px 16px;
  `)};
`;
UpcomingW.Title = styled.div`
  font-weight: 800;
  font-size: 16px;
  line-height: 18px;

  ${media.tablet (css`
    font-size: 28px;
    line-height: 32px;
  `)};
`;
UpcomingW.Description = styled.div`
  margin-top: 4px;
  font-size: 12px;
  line-height: 14px;

  ${media.tablet (css`
    margin-top: 12px;
    font-size: 24px;
    line-height: 27px;
  `)};
`;
UpcomingW.Timer = styled.div`
  margin-top: 21px;
  font-size: 20px;
  line-height: 23px;
  color: ${props => props.theme.white};

  ${media.tablet (css`
    margin-top: 44px;
    font-size: 40px;
    line-height: 45px; 
  `)};
`;
UpcomingW.Button = styled.button`
  margin-top: 32px;
  padding: 14px 16px;
  width: 141px;
  height: 52px;
  background: ${props => props.theme.gray90};
  border: 1.5px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  display: none;
  font-weight: bold;
  font-size: 16px;
  line-height: 18px;
  color: ${props => props.theme.white};
  
  ${media.tablet (css`
    margin-top: 44px;
    display: inherit;
    svg {
      margin-left: 12px;
    }
  `)};
`;
UpcomingW.Count = styled.div`
  margin-top: 32px;
  ${mixins.flexCenter};
  width: 24px;
  height: 16px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 20.5px;
  font-size: 10px;
  line-height: 11px;
  color: ${props => props.theme.gray30};
  ${media.tablet (css`
    display: none;
  `)};
`;

// TODO: Absolute not working
UpcomingW.Carousel = styled.section`
  position: absolute;
  width: 100%;
  height: 500px;
  background: #fff;
  z-index: 1;
`;

export const RecommendsW = styled.section`
  width: 100%;
  margin-top: 30px;
  ${media.tablet (css`
    margin-top: 165px;
  `)};
  padding-bottom: 12px;
`;

export const RecommendsTitleW = styled (TitleW)`
  margin-bottom: 20px;
  margin-top: 53px;
  ${media.tablet (css`
    margin-top: 0;
    margin-bottom: 32px;
  `)};
`;

RecommendsW.Zabo = styled (TwoCol.Left)`
  width: 100%;
  max-width: 100%;
  ${media.tablet (css`
    max-width: inherit;
  `)};
`;

RecommendsW.Group = styled (TwoCol.Right)`
  width: 100%;
  padding-bottom: 2px;
  max-width: 100%;
  ${media.tablet (css`
    max-width: inherit;
  `)};
`;

RecommendsW.GroupList = styled.div`
  margin-top: 8px;
  ${media.tablet (css`
    margin-top: 20px;
  `)};
`;

export const GroupBoxW = styled (GroupBox)`
  margin-top: 8px;
  &:first-child {
    margin-top: 0;
  }
  ${media.tablet (css`
    margin-top: 16px;
  `)};
`;

export const BannersW = styled.section`
  width: 100%;
  margin-top: 36px;
  ${media.tablet (css`
    margin-top: 80px;
  `)};
`;

export const BannerW = styled.div`
  min-width: 312px;
  height: 136px;
  border: 1px solid ${props => props.theme.gray10};
  border-radius: 6px;
  padding: 0 24px;
  display: flex;
  margin-left: 12px;
  
  ${media.tablet (css`
    min-width: 500px;
    height: 200px;
    padding: 0 48px;
    margin-left: 36px;
  `)};
  &:first-child {
    margin-left: 0;
  }
`;

BannerW.Writings = styled.div`
   padding: 24px 0;
   ${media.tablet (css`
    padding: 48px 0;
  `)};
`;

BannerW.Title = styled.div`
  font-weight: 800;
  font-size: 14px;
  line-height: 16px;
  color: ${props => props.theme.gray90};
  ${media.tablet (css`
    font-size: 20px;
    line-height: 23px;
  `)};
`;

BannerW.Description = styled.div`
  font-size: 14px;
  line-height: 16px;
  color: ${props => props.theme.gray90};
  margin-top: 2px;
  ${media.tablet (css`
    margin-top: 4px;
    font-size: 20px;
    line-height: 23px;
  `)};
`;

BannerW.Button = styled.button`
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
  color: ${props => props.theme.white};
  width: 120px;
  height: 32px;
  ${mixins.flexCenter};
  border: 1px solid ${props => props.theme[props.color]};
  background: ${props => props.theme[props.color]};
  border-radius: 4px;
  margin-top: 20px;
  svg {
    margin-left: 10px;
  }
  ${media.tablet (css`
    margin-top: 14px;
    width: 136px;
    height: 40px;
  `)};
`;

BannerW.Image = styled.img`
  height: 100%;
  width: auto;
`;

export const ZaboListW = styled.section`
  width: 100%;
`;

export const ZaboListTitleW = styled (TitleW)`
  margin-top: 48px;
  margin-bottom: 16px;
  ${media.tablet (css`
    margin-top: 100px;
    margin-bottom: 24px;
  `)};
`;

export const Help = styled.div`

`;

export default Wrapper;
