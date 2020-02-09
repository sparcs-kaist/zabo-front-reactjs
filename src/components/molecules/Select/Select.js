import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import ReactAsyncSelect from 'react-select/async';

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    color: state.isSelected ? 'red' : 'blue',
    padding: 20,
  }),
  control: () => ({
    // none of react-select's styles are passed to <Control />
    width: 200,
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  },
};

const Select = ({ async, ...props }) => {
  let Component = ReactSelect;
  if (async) Component = ReactAsyncSelect;
  return (
    <Component
      styles={customStyles}
      {...props}
    />
  );
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
