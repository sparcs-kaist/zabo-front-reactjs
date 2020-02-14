import styled from 'styled-components';

export const Page = styled.section`
  padding: 120px 0 80px 0;
  min-width: 1072px;
  @media (max-width: 640px) {
    min-width: 100%;
    padding: 48px 0;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
`;

Page.Header = styled.section`
  display: flex;
  width: 1032px;
  margin-bottom: 24px;
  @media (max-width: 640px) {
    flex-direction: column;
    width: 100%;
    margin-bottom: 24px;
  }
`;

Page.Header.Left = styled.section`
  display: flex;
  flex: 1;
  @media (max-width: 640px) {
    justify-content: flex-start;
    margin-bottom: 60px;
    min-width: 291px;
    padding: 0 24px;
  }
`;

Page.Header.Left.ProfilePhoto = styled.div`
  padding-right: 36px;
  @media (max-width: 640px) {
    padding-right: 28px;
  }
  img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    @media (max-width: 640px) {
      width: 105px;
      height: 105px;
    }
  }
`;

Page.Header.Left.UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 500px;
  h1 {
    font-size: 28px;
    color: #143441;
    margin: 0;
    font-weight: 800;
  }
  p {
    display: inline-block;
    
    margin: 10px 0 15px 0;
    color: #202020;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  button {
    height: 30px;
    font-size: 12px;
    font-weight: bold;
    line-height: 12px;
    padding: 8px 12px;
    border-radius: 15px;
    margin-right: 6px;
    background-color: #F8F8F8;
    &.logout {
      border: 1px solid #797979;
      color: #797979;
    }
    &.edit {
      border: 1px solid #143441;
      color: #143441;
    }
  }
  @media (max-width: 640px) {
    min-width: 158px;
    h1 { font-size: 24px }
    p { font-size: 14px }
  }
`;

Page.Header.Right = styled.section`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  /* flex: 1; */
  @media (max-width: 640px) {
    justify-content: center;
  }
`;

Page.Body = styled.div`
  width: 1032px;
  padding-left: 156px;
  @media (max-width: 640px) {
    width: 100%;
    padding: 0 24px;
  }
`;

Page.Body.User = styled.div`
  margin-bottom: 96px;
`;

Page.Body.Group = styled.div`
  margin-bottom: 59px;
  border-top: 1px solid #E9E9E9;
  padding-top: 16px;
  @media (max-width: 640px) {
    margin-bottom: 0;
  }
`;

// TODO: Refactor dups
export const Zabos = styled.section` 
  width: 1032px;
  margin-top: 72px;
  @media (max-width: 640px) {
    margin-top: 60px;
    padding: 0 16px;
    width: 100%;
  }
  h1 {
    display: inline-block;
    font-size: 22px;
    font-weight: 800;
    color: #363636;
    margin: 0 0 20px 0;
  }
`;

Zabos.ZaboList = styled.div`
  .masonry { margin: 0 }
`;
