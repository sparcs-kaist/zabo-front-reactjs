import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import ContainerAtom from 'atoms/Container';

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

export const CategoryW = styled.div``;

CategoryW.Image = styled.div`
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

CategoryW.Label = styled.div`
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
  display: flex;
  padding: 24px 16px;
  ${CategoryW} {
    margin-right: 20px;
    &:last-child {
      margin-right: 0;
    }
  }
  ${media.tablet (css`
    padding: 72px 0;
    ${CategoryW} {
      margin-right: 65px;
    }
  `)};
`;

CategoryW.Image.propTypes = {
  ...CategoryW.Image.propTypes,
  category: PropTypes.string.isRequired,
};

export default Wrapper;
