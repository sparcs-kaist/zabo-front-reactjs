import styled from "styled-components";

const LoadingWrapper = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Just Another Hand", cursive;

  height: ${(props) => props.height || "100vh"};

  ul {
    margin: 0;
    padding: 0;
    font-size: 10em;
    display: flex;
  }

  ul li {
    list-style: none;
    transition: 0.5s;
  }

  ul li span {
    display: inline-block;
  }

  @keyframes rt1 {
    0% {
      transform: rotate(0);
    }

    16.6666% {
      transform: rotate(180deg);
    }

    33.3333% {
      transform: rotate(180deg);
    }

    50% {
      transform: rotate(180deg);
    }

    66.6666% {
      transform: rotate(180deg);
    }

    83.3333% {
      transform: rotate(0);
    }

    100% {
      transform: rotate(0);
    }
  }

  @keyframes rt2 {
    0% {
      transform: rotate(0);
    }

    16.6666% {
      transform: rotate(0);
    }

    33.3333% {
      transform: rotate(180deg);
    }

    50% {
      transform: rotate(180deg);
    }

    66.6666% {
      transform: rotate(180deg);
    }

    83.3333% {
      transform: rotate(0);
    }

    100% {
      transform: rotate(0);
    }
  }

  @keyframes rt3 {
    0% {
      transform: rotate(0);
    }

    16.6666% {
      transform: rotate(0);
    }

    33.3333% {
      transform: rotate(0);
    }

    50% {
      transform: rotate(180deg);
    }

    66.6666% {
      transform: rotate(180deg);
    }

    83.3333% {
      transform: rotate(0);
    }

    100% {
      transform: rotate(0);
    }
  }

  ul li:first-child {
    animation-name: rt1;
    animation-duration: 4s;
    animation-delay: 0.75s;
    animation-iteration-count: infinite;
  }

  ul li:last-child span:nth-child(1) {
    animation-name: rt2;
    animation-duration: 4s;
    animation-delay: 0.75s;
    animation-iteration-count: infinite;
  }

  ul li:last-child span:nth-child(2) {
    animation-name: rt3;
    animation-duration: 4s;
    animation-delay: 0.75s;
    animation-iteration-count: infinite;
  }
`;

export default LoadingWrapper;
