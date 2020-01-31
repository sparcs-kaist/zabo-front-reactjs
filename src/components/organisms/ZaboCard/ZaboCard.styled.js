import styled from 'styled-components';

/* ============ Zabo ============ */
const ZaboCardStyle = styled.div`
  width: 240px; /* 530px 이상이면 240으로 고정하기. 최대 4줄 */

  @media (min-width: 0px) and (max-width: 530px) {
    width: calc(50% - 8px); /* 240 이 아닌 화면의 절반 */
  }
`;

ZaboCardStyle.Poster = styled.div`
  display: flex;
  position: relative;
  cursor: pointer;

  img {
    border-radius: 4px;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

ZaboCardStyle.Poster.Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, .03);
`;

ZaboCardStyle.DueDate = styled.div`
  position: absolute;
  right: 12px;
  top: 12px;
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 20px;
  font-size: 11px;
  line-height: 18px;
  border-radius: 2px;
  background: #143441;
  font-style: normal;
  font-weight: bold;
  color: #FFFFFF;
`;

ZaboCardStyle.Writings = styled.div`
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
    overflow : hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .card-meta {
    margin-top: 2px;
    font-size: 12px;
    line-height: 14px;
    color: #8F8F8F;
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

export default ZaboCardStyle;
