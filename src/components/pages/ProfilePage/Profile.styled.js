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
  margin-bottom: 120px;
  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

Page.Header.Left = styled.section`
  display: flex;
  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

Page.Header.Left.ProfilePhoto = styled.div`
  padding-right: 36px;
  img {
    width: 120px;
    height: 120px;
  }
`;

Page.Header.Left.UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  h1 {
    font-size: 28px;
    font-weight: bold;
    color: #143441;
    margin: 0;
  }
  p {
    margin: 10px 0 15px 0;
    color: #202020;
  }
  button {
    height: 30px;
    font-size: 12px;
    font-weight: bold;
    line-height: 12px;
    padding: 8px 12px;
    border-radius: 15px;
    margin-right: 6px;
    &.logout {
      border: 1px solid #797979;
      color: #797979;
    }
    &.edit {
      border: 1px solid #143441;
      color: #143441;
    }
  }
`;

Page.Header.Right = styled.section`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
`;

export const Groups = styled.section`
  width: 1032px;
  h1 {
    font-size: 22px;
    font-weight: bold;
    margin: 0 0 16px 0;
  }
`;

Groups.List = styled.div`
  width: 100%;
  overflow-x: scroll;
  white-space: nowrap;
`;

Groups.ListItem = styled.div`
  display: inline-block;
  width: 60px;
  margin-right: 16px;
  img {
    width: 100%;
    height: 60px;
    border-radius: 50%;
  }
  .group-name {
    width: 100%;
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 1em 0;
  }
`;

export const Stats = styled.section`
  display: inline-block;
`;

Stats.elem = styled.div`
  display: inline-block;
  border-right: 1px solid #E9E9E9;
  padding: 0 18px;

  &:nth-child(3) {
    padding-right: 0;
    border-right: none;
  }

  h3 {
    font-size: 22px;
    font-weight: bold;
    color: #143441;
    text-align: center;
    margin: 0 0 6px 0;
  }
  div {
    font-size: 14px;
    color: #8F8F8F;
    text-align: center;
  }
`;
