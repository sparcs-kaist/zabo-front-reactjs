import styled from 'styled-components';

export const Page = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
`;

Page.Header = styled.section``;

Page.Header.BackPhoto = styled.div`
  margin: 0 -16px;
  div {
    background-repeat: no-repeat;
    background-position: 0 0;
    background-size: cover;
    width: 100%;
    height: 35vh;
  }
`;

Page.Header.ProfilePhoto = styled.div`
  img {
    width: 80px;
    height: 80px;
    margin-top: -40px;
    border-radius: 50%;
  }
`;

Page.Header.UserInfo = styled.div`
  font-size: 28px;
  font-weight: bold;
  padding: 16px 0 22px 0;
  min-height: 64px;
  button {
    height: 30px;
    width: 80px;
    font-size: 14px;
    border-radius: 5px;
    color: white;
    background-color: #143441;
    float: right;
  }
`;

export const Intro = styled.section`
  border-top: 1px solid #F4F4F4;
  h1 { color: #8F8F8F }
  padding-bottom: 21px;
`;

export const Groups = styled.section`
  border-top: 1px solid #F4F4F4;
`;

Groups.List = styled.div`
  width: 100%;
  overflow-x: scroll;
  white-space: nowrap;
  &::-webkit-scrollbar { 
    width: 0 !important;
  }
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
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
