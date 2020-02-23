import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  overflow: scroll;
  @media (max-width: 910px) {
    padding: 0 18px;
  }
  ${props => props.ownStyle || ''};
`;

export default Container;
