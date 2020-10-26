import React from 'react';
import PropTypes from 'prop-types';

import Select from 'components/molecules/Select';

const sizes = {
  small: {
    fontSize: 12,
    lineHeight: '14px',
    height: 30,
    borderRadius: 15,
    indicatorSize: 16,
    indicatorPaddingLeft: 4,
    indicatorPaddingRight: 8,
    valuePaddingLeft: 10,
  },
  regular: {
    fontSize: 16,
    lineHeight: '18px',
    height: 38,
    borderRadius: 4,
    indicatorSize: 20,
    indicatorPaddingLeft: 8,
    indicatorPaddingRight: 8,
    valuePaddingLeft: 16,
  },
};

const customStyles = {
  container: (provided, state) => ({
    ...provided,
    width: state.selectProps.width,
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#F4F4F4' : '#FFFFFF',
    fontSize: sizes[state.selectProps.size].fontSize,
    lineHeight: sizes[state.selectProps.size].lineHeight,
    color: '#143441',
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: '#F4F4F4',
    },
  }),
  control: (provided, state) => ({
    ...provided,
    width: state.selectProps.width,
    height: sizes[state.selectProps.size].height,
    minHeight: sizes[state.selectProps.size].height,
    borderRadius: sizes[state.selectProps.size].borderRadius,
    background: '#F4F4F4',
    border: 'none',
    '&:hover': {},
    boxShadow: 'none',
  }),
  placeholder: (provided, state) => ({
    ...provided,
    fontSize: sizes[state.selectProps.size].fontSize,
    lineHeight: sizes[state.selectProps.size].lineHeight,
    padding: '2px 11px',
    color: '#8F8F8F',
  }),
  menu: (provided, state) => ({
    ...provided,
    marginTop: 4,
    paddingTop: state.options.length ? 6 : 0,
    width: state.selectProps.width,
    borderRadius: 4,
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.3)',
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    height: sizes[state.selectProps.size].height,
    minHeight: sizes[state.selectProps.size].height,
    paddingLeft: sizes[state.selectProps.size].valuePaddingLeft,
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: '#143441',
    fontWeight: 'bold',
    fontSize: sizes[state.selectProps.size].fontSize,
    lineHeight: sizes[state.selectProps.size].lineHeight,
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    div: {
      paddingRight: sizes[state.selectProps.size].indicatorPaddingRight,
      paddingLeft: sizes[state.selectProps.size].indicatorPaddingLeft,
    },
    svg: {
      width: sizes[state.selectProps.size].indicatorSize,
      height: sizes[state.selectProps.size].indicatorSize,
    },
  }),
};

const SimpleSelect = ({ ...props }) => (
  <Select
    components={{ IndicatorSeparator: null }}
    styles={customStyles}
    isClearable
    isSearchable={false}
    {...props}
  />
);

SimpleSelect.propTypes = {
  ...Select.propTypes,
  size: PropTypes.oneOf (['small', 'regular']),
};

SimpleSelect.defaultProps = {
  size: 'regular',
};

export default SimpleSelect;
