import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import StyledButton, { ButtonGroup } from "./Button.styled";

const Button = ({ history, to, onClick, ...props }) => (
  <StyledButton
    {...props}
    onClick={(event) => {
      if (typeof onClick === "function") onClick(event);
      if (to) history.push(to);
    }}
  />
);

Button.propTypes = {
  ...StyledButton.propTypes,
  className: PropTypes.string,
  to: PropTypes.string,
  type: PropTypes.string,
};

Button.defaultProps = {
  ...StyledButton.defaultProps,
  className: "",
  to: "",
  type: "button",
};

Button.defaultProps = {};

Button.Group = ButtonGroup;

export default withRouter(Button);
