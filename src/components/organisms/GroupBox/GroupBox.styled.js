import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Group = styled (Link)`
display: inline-block;
width: 297px;
height: 126px;
border-radius: 6px;
margin-right: 14px;
padding: 28px 14px;
box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3);
&:last-child {
  margin-right: 0;
}

img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-right: 14px;
}
section {
  display: inline-block;
}
.group-name {
  width: 100%;
  font-size: 18px;
  color: #143441;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 0 14px 0;
  font-weight: 800;
}

@media (max-width: 640px) {
  width: 247px;
  height: 108px;
  padding: 24px 12px;
  img {
    width: 60px;
    height: 60px;
    margin-right: 12px;
  }
  .group-name {
    font-size: 16px;
    margin: 0 0 12px 0;
  }
}
`;
