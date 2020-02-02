import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';
import Container from 'atoms/Container';
import FooterWrapper from './Footer.styled';

const containerStyle = css`
  position: absolute;
  justify-content: space-between;
  align-items: center;
  div { flex: 1 }

  ${props => (props.scrollHeader ? css`
    @media (min-width: 640px) {
      min-width: 1072px;
    }
  ` : css`
  `)}
`;

const Footer = ({ buttonGroup, scrollFooter }) => {
  const [left, setLeft] = useState (0);
  useEffect (() => {
    const listener = () => setLeft (-window.pageXOffset);
    window.addEventListener ('optimizedScroll', listener);
    return () => window.removeEventListener ('optimizedScroll', listener);
  }, []);
  const style = { left };

  return (
    <FooterWrapper>
      <Container ownStyle={containerStyle} style={style} scrollHeader={scrollFooter}>
        <div> </div>
        {buttonGroup}
      </Container>
    </FooterWrapper>
  );
};

Footer.propTypes = {
  buttonGroup: PropTypes.element,
  scrollFooter: PropTypes.bool,
};

export default Footer;
