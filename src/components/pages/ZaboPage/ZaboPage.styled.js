import styled from 'styled-components';

export const ZaboPageWrapper = styled.div`
  padding: 80px 0;
  min-width: 1072px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

ZaboPageWrapper.TwoCol = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  min-height: 712.22px;
  width: 1032px;
  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

ZaboPageWrapper.TitleImage = styled.section`
  flex: 1;
  height: 100%;
  margin-right: 48px;
  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    vertical-align: top;
  }
`;

ZaboPageWrapper.Info = styled.section`
  flex: 1.05;
  height: 100%;
`;

ZaboPageWrapper.Info.Header = styled.section`
  .keyword-result {
    padding: 0px;
    width: 100%;
    margin: 0;
    li {
      display: inline-block;
      border-radius: 2px;
      padding: 4px 6px;
      margin-right: 8px;
      background: #EEEEEE;
      color: #5C5C5C;
      font-size: 14px;
      line-height: 16px;
    }
  }
  
  h1 {
    display: inline-block;
    font-size: 28px;
    font-weight: bold;
    margin: 12px 20px 12px 0;
    vertical-align: middle;
  }
  .due-date {
    display: inline-block;
    width: 58px;
    height: 26px;
    padding: 4px 10px;
    border-radius: 4px;
    background: #143441;
    color: white;
    font-size: 16px;
    vertical-align: middle;
  }

  .after-create {
    font-size: 14px;
    line-height: 14px;
    color: #666666;
  }
`;

ZaboPageWrapper.Info.Box = styled.div`
  display: inline-block;
  margin: 28px 8px 72px 0;
  min-width: 86px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid #143441;
  padding: 8px 14px;

  img {
    width: 24px;
    height: 24px;
  }
  div {
    display: inline-block;
    position: relative;
    top: -8px;
    left: 4px;
  }
`;

ZaboPageWrapper.Info.Body = styled.section`
  .borderLine {
    border: 1px solid #D7D7D7;
  }

  .owner {
    color: #202020;
  }
`;

ZaboPageWrapper.Recommend = styled.section`
  margin-top: 100px;
`;
