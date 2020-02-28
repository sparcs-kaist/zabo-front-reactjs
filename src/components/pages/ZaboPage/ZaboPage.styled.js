import styled from 'styled-components';

export const ZaboPageWrapper = styled.div`
  min-width: 1072px;
  @media (max-width: 640px) {
    min-width: 100%;
    padding: 0;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
`;

ZaboPageWrapper.Detail = styled.div`
  padding: 80px 0;
`;

ZaboPageWrapper.TwoCol = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 1032px;
  @media (max-width: 640px) {
    flex-direction: column;
    width: 100%;
  }
`;

ZaboPageWrapper.TitleImage = styled.section`
  flex: 1;
  height: 100%;
  margin-right: 48px;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  @media (max-width: 640px) {
    margin-right: 0;
    border-radius: 0px;
  }
  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    vertical-align: top;
    @media (max-width: 640px) {
      border-radius: 0;
    }
  }
`;

ZaboPageWrapper.Info = styled.section`
  flex: 1.05;
  height: 100%;
  @media (max-width: 640px) {
    padding: 24px 16px 0 16px;
  }
`;

ZaboPageWrapper.Info.Header = styled.section`
  .keyword-result {
    padding: 0px;
    width: 100%;
    margin: 0;
    li {
      display: inline-block;
      border-radius: 2px;
      padding: 4px 5px;
      margin: 0 8px 12px 0;
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
    color: #143441;
    margin: 0 20px 12px 0;
    vertical-align: middle;
    @media (max-width: 640px) {
      font-size: 24px;
      margin-right: 12px;
      margin-bottom: 10px;
    } 
  }
  .zabo-page-header-title-group {
    display: flex;
    width: 100%;
    .zabo-page-header-title {
      flex: 1;
      display: inline-block;
    }
    .due-date {
      margin-top: 4px;
      display: inline-block;
      height: 26px;
      padding: 4px 10px;
      border-radius: 4px;
      background: #143441;
      color: white;
      font-size: 16px;
      font-weight: bold;
      vertical-align: middle;
    }
    @media (max-width: 640px) {
      .due-date {
        margin-top: 5px;
        height: 20px;
        font-size: 12px;
        padding: 3px 4px;
        border-radius: 2px;
      }
    }
  }

  .details{
    display: inline-block;
    font-size: 14px;
    line-height: 14px;
    color: #666666;
    &:nth-child(1) { padding-right: 8px }
    &:nth-child(3) { padding-left: 8px }
    @media (max-width: 640px) {
      font-size: 12px;
    }
  }
  .specialChar {
    display: inline-block;
    color: #8F8F8F;
    vertical-align: middle;
  }

  .statSection {
    display: flex;
  }
`;

ZaboPageWrapper.Info.Body = styled.section`
  color: #202020;
  .borderLine {
    border: 0.5px solid #E9E9E9;
  }
  
  .owner {
    display: flex;
    align-items: center;
  }

  .owner-link {
    color: #202020;
    height: 64px;
    display: flex;
    align-items: center;
    @media (max-width: 640px) {
      height: 56px;
    }
    img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      margin-right: 10px;
    }
    
    .owner-label {
      display: flex;
      flex-direction: column;
      justify-content: center;
      .owner-group { 
        font-size: 16px;
        line-height: 18px;
        color: #202020;
        &.follow { font-size: 14px; }
      }
      .owner-creator {
        margin-top: 2px;
        font-size: 12px;
        line-height: 14px;
        color: #666666;
      }
    }
  }
  .specialChar {
    display: inline-block;
    color: #8F8F8F;
    vertical-align: middle;
    margin: 0 8px;
  }
  .follow {
    font-size: 14px;
    line-height: 16px;
    color: #143441;
    cursor: pointer;
  }
  .unfollow {
    font-size: 14px;
    line-height: 16px;
    color: #BCBCBC;
    cursor: pointer;
  }
  .contents {
    padding-top: 28px;
    @media (max-width: 640px) {
      padding-top: 24px;
    }
  }
`;

ZaboPageWrapper.Recommend = styled.section`
  width: 1032px;
  margin-top: 100.78px;
  @media (max-width: 640px) {
    margin-top: 64px;
    padding: 0 16px;
    width: 100%;
  }

  h1 {
    font-size: 24px;
    font-weight: bold;
    margin-top: 0;
    margin-bottom: 16px;
    color: #363636;
    @media (max-width: 640px) {
      font-size: 18px;
    }
  }
`;
