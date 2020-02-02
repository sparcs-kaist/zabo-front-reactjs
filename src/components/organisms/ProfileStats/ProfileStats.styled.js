import styled, { css } from 'styled-components';

export const Stats = styled.section`
  display: inline-block;
`;

Stats.elem = styled.div`
  display: inline-block;
  border-right: 1px solid #E9E9E9;
  padding: 0 18px;

  h3 {
    font-size: 22px;
    font-weight: 800;
    color: #143441;
    text-align: center;
    margin: 0 0 6px 0;
  }
  div {
    font-size: 14px;
    color: #8F8F8F;
    text-align: center;
  }

  ${props => (props.small ? css`
    padding: 0 16px;
    h3 { 
      font-size: 16px;
      margin-bottom: 4px;
      font-weight: bold;
    }
    div { font-size: 12px }
    @media (max-width: 640px) {
      padding: 0 12px;
      h3 {
        font-size: 14px;
        margin-bottom: 3px;
      }
      div { font-size: 10px }
    }
  ` : css``)};
  
  &:nth-child(1) {
    padding-left: 0;
  }
  &:nth-child(3) {
    padding-right: 0;
    border-right: none;
  }
`;
