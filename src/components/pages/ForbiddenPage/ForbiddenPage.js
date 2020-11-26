import React from 'react';
import { NavLink } from 'react-router-dom';

import forbiddenPageImage from 'static/images/notFoundImage.jpg';
import logo from 'static/logo/logo.svg';

import { Page } from './ForbiddenPage.styled';

const ForbiddenPage = () => (
  <Page>
    <Page.Header>
      <NavLink to="/">
        <img alt="logo" src={logo} style={{ width: '68px', height: '32px' }} />
      </NavLink>
    </Page.Header>
    <Page.Body>
      <Page.Title src={forbiddenPageImage} />
      <Page.Description>
        요청하신 페이지에 대한 접근 권한이 없습니다.<br />
        <Page.Description.Link href="/">메인페이지</Page.Description.Link>
        로 이동하기
      </Page.Description>
    </Page.Body>
  </Page>
);

export default ForbiddenPage;
