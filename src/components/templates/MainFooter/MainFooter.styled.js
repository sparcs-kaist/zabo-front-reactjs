import styled from 'styled-components';

export const MainFooterW = styled.div`
  position: relative;
  left: 0;
  bottom: 0;
  height: 50px;
  color: white;
  background-color: #143441;
  padding: 0 24px;

  display: flex;
  align-items: center;

  @media(max-width: 910px) {
    padding: 0 16px;
  }
`;

MainFooterW.Links = styled.div`
  font-size: 15px;
  line-height: 17px;
  font-weight: 700;
  margin-left: 40px;
  
  flex: 1;
  display: flex;
  align-items: center;
  @media(max-width: 910px) {
    justify-content: flex-end;
  }
`;

MainFooterW.Button = styled.div`
  margin-left: 24px;
  cursor: pointer;

  @media(max-width: 910px) {
    margin-left: 12px;
  }
`;

MainFooterW.Contact = styled.div`
  font-size: 13px;
  font-weight: 700;

  @media(max-width: 910px) {
    display: none;
  }
`;
