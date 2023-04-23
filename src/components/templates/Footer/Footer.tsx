import React, { type PropsWithChildren, useEffect, useState } from "react";
import { css } from "styled-components";

import Container from "components/atoms/Container";

import FooterWrapper from "./Footer.styled";

const containerStyle = (props: { horizontalScroll?: boolean }) => css`
  position: absolute;
  justify-content: space-between;
  align-items: center;

  ${props.horizontalScroll &&
  css`
    @media (min-width: 640px) {
      min-width: 1072px;
    }
  `}
`;

interface Props extends PropsWithChildren {
  ownStyle?: ReturnType<typeof css>;
  scrollFooter?: boolean;
}

const Footer: React.FC<Props> = ({ ownStyle, scrollFooter, children }) => {
  const [left, setLeft] = useState(0);
  useEffect(() => {
    const listener = () => setLeft(-window.pageXOffset);
    window.addEventListener("optimizedScroll", listener);
    return () => window.removeEventListener("optimizedScroll", listener);
  }, []);
  const style = { left };

  return (
    <FooterWrapper ownStyle={ownStyle}>
      <Container ownStyle={containerStyle({ horizontalScroll: scrollFooter })} style={style}>
        {children}
      </Container>
    </FooterWrapper>
  );
};

export default Footer;
