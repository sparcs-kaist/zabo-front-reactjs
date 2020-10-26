import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';

import Container from 'components/atoms/Container';

import FooterWrapper from './Footer.styled';

const containerStyle = css`
  position: absolute;
  justify-content: space-between;
  align-items: center;

  ${props => (props.horizontalScroll ? css`
    @media (min-width: 640px) {
      min-width: 1072px;
    }
  ` : css`
  `)}
`;

const Footer = ({ ownStyle, scrollFooter, children }) => {
  const [left, setLeft] = useState (0);
  useEffect (() => {
    const listener = () => setLeft (-window.pageXOffset);
    window.addEventListener ('optimizedScroll', listener);
    return () => window.removeEventListener ('optimizedScroll', listener);
  }, []);
  const style = { left };

  return (
    <FooterWrapper ownStyle={ownStyle}>
      <Container ownStyle={containerStyle} style={style} horizontalScroll={scrollFooter}>
        {children}
      </Container>
    </FooterWrapper>
  );
};

Footer.propTypes = {
  scrollFooter: PropTypes.bool,
  children: PropTypes.element,
};

export default Footer;
