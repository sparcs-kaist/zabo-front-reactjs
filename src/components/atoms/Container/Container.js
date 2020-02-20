import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  ${props => props.ownStyle};
  @media (max-width: 910px) {
    padding: 0 18px;
  }
`;

export default Container;
