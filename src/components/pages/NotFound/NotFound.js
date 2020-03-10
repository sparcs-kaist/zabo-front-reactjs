import React from 'react';

import notFoundImage from 'static/images/notFoundImage.jpg';

import { Page } from './NotFound.styled';

const NotFound = () => (
  <Page>
    <Page.Header />
    <Page.Body>
      <Page.Title src={notFoundImage} />
      <Page.Description>
        요청하신 페이지를 찾을 수 없습니다.<br />
        <Page.Description.Link href="https://zabo.sparcs.org">메인페이지</Page.Description.Link>
        로 이동하기
      </Page.Description>
    </Page.Body>
  </Page>
);

export default NotFound;
