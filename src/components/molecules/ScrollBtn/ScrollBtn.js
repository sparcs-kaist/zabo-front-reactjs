import React, { useCallback } from 'react';
import styled, { css } from 'styled-components';

import leftScroll from 'static/images/leftScroll.png';
import rightScroll from 'static/images/rightScroll.png';

const ScrollBtnW = styled.div`
  ${props => (props.show ? css`` : css`
    display: none;
  `)};
  @media (max-width: 640px) {
    display: none;
  }
  float: right;
  img {
    width: 30px;
    height: 30px;
    margin-left: 3px;
    border-radius: 50%;
    cursor: pointer;
    &:hover {
      box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
    }
  }
  margin: 0 auto;
`;

const ScrollBtn = ({
  elemId, show, scrollSize = 622, left = true, right = true,
}) => {
  const leftScrollClick = useCallback (() => {
    document.getElementById (elemId).scrollLeft -= scrollSize;
  }, []);
  const rightScrollClick = useCallback (() => {
    document.getElementById (elemId).scrollLeft += scrollSize;
  }, []);
  return (
    <ScrollBtnW show={show}>
      {left && <img onClick={leftScrollClick} src={leftScroll} alt="left scroll button" />}
      {right && <img onClick={rightScrollClick} src={rightScroll} alt="right scroll button" />}
    </ScrollBtnW>
  );
};

export default ScrollBtn;
