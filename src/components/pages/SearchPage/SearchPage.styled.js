import styled from 'styled-components';

export const Page = styled.div`
  min-width: 1072px;
  padding: 48px 0;
  @media (max-width: 640px) {
    min-width: 100%;
    padding: 28px 0;
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

// TODO: Refactor dups
export const Zabos = styled.section` 
  width: 1032px;
  margin-top: 62px;
  h1 {
    display: inline-block;
    font-size: 22px;
    font-weight: 800;
    color: #363636;
    margin: 0;
  }
  .emptySpace { margin-top: 8px }
  @media (max-width: 640px) {
    margin-top: 38px;
    padding: 0 16px;
    width: 100%;
    h1 {
      font-size: 18px;
    }
    .emptySpace { margin-top: 0 }
  }
`;
