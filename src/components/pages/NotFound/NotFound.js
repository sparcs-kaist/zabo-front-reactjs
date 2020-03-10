import React from 'react';

import notFoundImage from 'static/images/notFoundImage.jpg';

import { Page } from './NotFound.styled';

const NotFound = () => (
  <Page>
    <Page.Header />
    <Page.Body>
      <Page.Title>
        <Page.Title.Text>404</Page.Title.Text>
        <Page.Title.Image src={notFoundImage} />
      </Page.Title>
      <Page.Description>
        <p>요청하신 페이지를 찾을 수 없습니다.</p>
      </Page.Description>
    </Page.Body>
  </Page>
);

export default NotFound;
