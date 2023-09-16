import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const modalRoot = document.getElementById("modal-root");

class Portal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

const ModalWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Modal = (props) => (
  <Portal>
    <ModalWrapper>{props.children}</ModalWrapper>
  </Portal>
);

export default Modal;
