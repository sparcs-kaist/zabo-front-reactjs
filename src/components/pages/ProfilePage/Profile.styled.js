import styled from 'styled-components';

export const Page = styled.section`
  display: flex;
  flex-direction: column;
`;

Page.Header = styled.section``;

Page.Header.BackPhoto = styled.div`
  img {
    width: 100%;
    height: auto;
  }
`;

Page.Header.ProfilePhoto = styled.div`
  img {
    width: 120px;
    height: 120px;
  }
`;
