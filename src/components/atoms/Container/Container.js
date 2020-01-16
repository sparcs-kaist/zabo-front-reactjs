import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  ${props => props.ownStyle};
`;

export default Container;
