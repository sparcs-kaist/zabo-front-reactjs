import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';

export const NavItem = styled (NavLink)`
  flex: 1 0 20%;
  margin: 0 2.5%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  transition: all 0.4s ease;
  img {
    transition: all 0.4s ease;
    width: 20px;
    height: 20px;
    margin-bottom: 6px;
  }
  &:hover {
    cursor: pointer;
  }
  &.active {
    border-bottom: 1px solid black;
  }
`;

const FloatingNavigatorWrapper = styled.div`
  position: fixed;
  transition: max-height 0.4s;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  max-height: ${props => (props.show ? '60px' : 0)};
  overflow: hidden;
  border-top: 1px solid black;
  background-color: white;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  
  ${NavItem} {
    ${props => (props.show
    ? css``
    : css`
            img {
              width: 0;
              height: 0;
            }
            font-size: 0;
          `)};
  @media (min-width: 560px) {
    display: none;
  }
`;

export default FloatingNavigatorWrapper;
