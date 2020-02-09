import styled from 'styled-components';

export const Page = styled.div`
  min-width: 1072px;
  padding: 48px 0;
  @media (max-width: 640px) {
    min-width: 100%;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
`;

Page.Body = styled.div`
  width: 1032px;
  @media (max-width: 640px) {
    width: 100%;
  }
`;
