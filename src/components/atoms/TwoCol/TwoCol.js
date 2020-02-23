import styled from 'styled-components';

const Col = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1 0 50%;
`;

const TwoCol = styled.section`
  display: flex;
  width: 100%;
`;

TwoCol.Left = Col;
TwoCol.Right = Col;

export default TwoCol;
