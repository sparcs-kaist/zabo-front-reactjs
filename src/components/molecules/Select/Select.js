import React from "react";
import PropTypes from "prop-types";
import ReactSelect from "react-select";
import ReactAsyncSelect from "react-select/async";

const Select = ({ async, ...props }) => {
  let Component = ReactSelect;
  if (async) Component = ReactAsyncSelect;
  return <Component {...props} />;
};

Select.propTypes = {
  ...ReactSelect.propTypes,
  ...ReactAsyncSelect.propTypes,
  async: PropTypes.bool,
};

Select.defaultProps = {
  async: false,
};

export default Select;
