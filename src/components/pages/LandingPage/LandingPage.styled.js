import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import ContainerAtom from 'atoms/Container';
import SVG from 'atoms/SVG';
import TwoCol from 'atoms/TwoCol';

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

export const TopBanner = styled.div`
  margin: -55px 0 0;
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

export const CategoryNavW = styled.div``;

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
    padding: 72px 0;
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
  margin-top: 83px;
  ${media.tablet (css`
    margin-top: 165px;
  `)};
`;

RecommendsW.Zabo = styled.section`
  width: 100%;
`;

RecommendsW.Group = styled.section`
  width: 100%;
`;
RecommendsW.Group.List = styled.div`
  margin-top: 8px;
  ${media.tablet (css`
    margin-top: 20px;
  `)};
`;

RecommendsW.Title = styled.div`
  font-weight: 800;
  font-size: 20px;
  line-height: 23px;
  color: ${props => props.theme.gray90};
  margin-bottom: 20px;
  ${media.tablet (css`
    font-size: 24px;
    line-height: 27px;
    margin-bottom: 32px;
  `)};
`;

export const Help = styled.div`

`;

export default Wrapper;
