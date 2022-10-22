import styled, { css } from "styled-components";

import * as mixins from "lib/mixins";
import { media } from "lib/utils/style";

/* ============ Zabo ============ */
const ZaboCardW = styled.div`
  width: 240px;

  @media (min-width: 0px) and (max-width: 784px) {
    width: calc(50% - 8px); /* 240 이 아닌 화면의 절반 */
  }
  @media (min-width: 785px) and (max-width: 1064px) {
    width: calc(33.3334% - 12px);
  }
`;

export const PosterW = styled.div`
  display: flex;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  border-radius: 4px;
  ${(props) =>
    props.anchor === "width"
      ? css`
          width: 240px;
        `
      : css`
          height: 100%;
        `};
  &:hover {
    .hover-show {
      visibility: visible;
    }
  }
  @media (max-width: 640px) {
    &:hover {
      .dimmer,
      .hover-show {
        display: none;
      }
    }
  }
`;

PosterW.Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
`;

PosterW.Dimmer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.03);
`;

export const OverlayW = styled.div`
  visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35));
`;

OverlayW.StatLocator = styled.div`
  position: absolute;
  bottom: 16px;
  right: 16px;
  display: flex;
  .stat-box:first-child {
    margin-right: 17px;
  }
`;

export const WritingsW = styled.div`
  padding: 16px 0 13px;
  color: #143441;

  a {
    max-width: calc(100% - 30px);
  }
  .title {
    flex: 1;
    font-weight: bold;
    font-size: 14px;
    line-height: 16px;
    color: #143441;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .card-meta {
    margin-top: 2px;
    font-size: 12px;
    line-height: 14px;
    color: #8f8f8f;
  }
  .author {
    margin-top: 8px;
    font-size: 10px;
    line-height: 11px;
    color: #202020;
  }

  @media (min-width: 530px) {
    .title {
      font-size: 18px;
      line-height: 20px;
    }
    .author {
      font-size: 14px;
      line-height: 16px;
    }
  }
`;

export const PosterLW = styled.div`
  display: flex;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  height: 100%;
  border-radius: 4px 0 0 4px;
  width: 114px;
  ${media.tablet(css`
    width: 140px;
  `)};
`;

PosterLW.Image = styled.img`
  position: absolute;
  left: 50%;
  top: 0;
  height: 100%;
  transform: translate(-50%, 0);
`;

PosterLW.Dimmer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.03);
`;

export const ZaboCardLW = styled.section`
  display: flex;
  width: 100%;
  height: 145px;
  border: 1px solid #e9e9e9;
  border-radius: 4px;
  overflow: hidden;
  color: ${(props) => props.theme.white};
  margin-bottom: 8px;
  ${PosterLW} {
    height: 145px;
  }
  ${media.tablet(css`
    height: 178px;
    margin-bottom: 16px;
    ${PosterLW} {
      height: 178px;
    }
  `)};
  &:last-child {
    margin-bottom: 0;
  }
`;

export const WritingsLW = styled.section`
  display: flex;
  flex-direction: column;
  padding: 16px;
  overflow: hidden;
  max-width: 500px;
`;

export const Title = styled.div`
  display: inline-block;
  font-weight: 800;
  font-size: 14px;
  line-height: 16px;
  margin-top: 9px;
  margin-bottom: 11px;
  margin-right: 24px;
  color: ${(props) => props.theme.main};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  min-height: 16px;
  ${media.tablet(css`
    font-size: 18px;
    line-height: 20px;
    min-height: 20px;
    margin-top: 8px;
    margin-bottom: 16px;
  `)};
`;

export const OwnerW = styled.div`
  display: flex;
`;

OwnerW.Profile = styled.img`
  width: 24px;
  height: 24px;
`;

OwnerW.Name = styled.div`
  ${mixins.flexCenter};
  font-size: 14px;
  line-height: 16px;
  color: ${(props) => props.theme.gray100};
  margin-left: 6px;
  ${media.tablet(css`
    font-size: 14px;
    line-height: 16px;
    margin-left: 8px;
  `)};
`;

export const MetaInfo = styled.div`
  justify-self: flex-end;
  display: flex;
  font-size: 10px;
  line-height: 11px;
  color: #666666;
  margin-top: 24px;
  ${media.tablet(css`
    font-size: 12px;
    line-height: 14px;
    margin-top: 44px;
  `)};
`;

// ::before {
//  content: '\00b7';
// }
MetaInfo.Dot = styled.div`
  display: inline-block;
  color: #8f8f8f;
  vertical-align: middle;
  text-align: center;
  width: 14px;
`;

export default ZaboCardW;
