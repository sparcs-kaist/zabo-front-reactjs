import React from "react";
import { NavLink } from "react-router-dom";

import notFoundImage from "static/images/notFoundImage.jpg";
import logo from "static/logo/logo.svg";

import { Page } from "./NotFound.styled";

const NotFound = () => (
  <Page>
    <Page.Header>
      <NavLink to="/">
        <img alt="logo" src={logo} style={{ width: "68px", height: "32px" }} />
      </NavLink>
    </Page.Header>
    <Page.Body>
      <Page.Title src={notFoundImage} />
      <Page.Description>
        요청하신 페이지를 찾을 수 없습니다.
        <br />
        <Page.Description.Link href="/">메인페이지</Page.Description.Link>로 이동하기
      </Page.Description>
    </Page.Body>
  </Page>
);

export default NotFound;
