import styled from 'styled-components';

/* ============ Zabo ============ */
const ZaboCardStyle = styled.div`
  width: 240px; /* 530px 이상이면 240으로 고정하기. 최대 4줄 */

  @media (min-width: 0px) and (max-width: 530px) {
    width: calc(50% - 5px); /* 240 이 아닌 화면의 절반 */
  }
`;

ZaboCardStyle.Poster = styled.div`
  display: flex;
  background-color: lightgrey;
  position: relative;
  cursor: pointer;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  img {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

ZaboCardStyle.Writings = styled.div`
  padding: 10px 5px 13px 5px;
  /* TODO: 아래 패딩 10px 늘림 / 폰트 너무 작아 / font-weight - 근용이 확인 */
  color: #143441;

  .top {
    display: flex;
    justify-content: space-between;
    width: 100%;
    a {
      max-width: calc(100% - 30px);
    }
    .title {
      flex: 1;
      font-weight: bold;
      font-size: 14px;
      cursor: pointer;
      line-height: 16px;
      color: #143441;
      overflow : hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .due-date {
      width: 27px;
      height: 15px;
      flex-shrink: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #143441;
      border-radius: 2px;
      font-style: normal;
      font-weight: bold;
      font-size: 8px;
      line-height: 9px;
      color: #FFFFFF;
    }
  }
  .author {
    margin-top: 5px;
    font-size: 10px;
    cursor: pointer;
    line-height: 11px;
    color: #8F8F8F;
  }

  @media (min-width: 530px) {
    .title {
      font-size: 16px;
    }
    .author {
      font-size: 13px;
    }
  }
`;

export default ZaboCardStyle;
