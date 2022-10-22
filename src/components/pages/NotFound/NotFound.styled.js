import styled, { css } from "styled-components";

import { media } from "lib/utils/style";

export const Page = styled.section`
  width: 100%;
  height: 100%;
`;

Page.Header = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 55px;
  border-top: 5px solid ${(props) => props.theme.main};
  padding: 10px 18px;
`;

Page.Body = styled.div`
  width: 90vw;
  margin: 240px 5vw 0;
  ${media.tablet(css`
    width: 34vw;
    margin: 280px 33vw 0;
  `)};
`;

Page.Title = styled.img`
  width: 60vw;
  margin: 0 15vw;
  ${media.tablet(css`
    width: 34vw;
    margin: 0;
  `)};
`;

Page.Description = styled.p`
  text-align: center;
  margin-top: 28px;
  line-height: 1.6;
  font-size: 16px;
  color: ${(props) => props.theme.gray30};
  ${media.tablet(css`
    margin-top: 48px;
    font-size: 18px;
  `)};
`;

Page.Description.Link = styled.a`
  color: ${(props) => props.theme.main} !important;
  font-weight: bold;
  text-decoration: underline;
`;

export default Page;
