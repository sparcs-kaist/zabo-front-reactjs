import React from 'react';
import { components } from 'react-select';

import Select from 'molecules/Select';

import defaultProfile from '../../../static/images/defaultProfile.png';
import searchIcon from '../../../static/images/search-icon-navy.png';

const customStyles = {
  container: (provided, state) => {
    const focused = state.isFocused ? {
      boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.3)',
      borderRadius: 4,
    } : {};
    return {
      ...provided,
      width: 388,
      ...focused,
    };
  },
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#F4F4F4' : '#FFFFFF',
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    img: {
      width: 32,
      height: 32,
      marginRight: 10,
      borderRadius: '50%',
    },
    '&:hover': {
      backgroundColor: '#F4F4F4',
    },
  }),
  control: (provided, state) => {
    const focused = state.isFocused ? {
      background: '#FFFFFF',
      borderRadius: '4px 4px 0 0',
      boxShadow: 'none',
      borderBottom: '1px solid #E9E9E9',
    } : {};
    return ({
      ...provided,
      width: 388,
      height: 38,
      borderRadius: 4,
      background: '#F4F4F4',
      border: 'none',
      img: {
        width: 18,
        height: 18,
        marginLeft: 19,
      },
      '&:hover': {},
      ...focused,
    });
  },
  placeholder: (provided, state) => ({
    ...provided,
    fontSize: 16,
    padding: '2px 11px',
    lineHeight: '18px',
    color: '#8F8F8F',
  }),
  input: (provided, state) => ({
    ...provided,
    padding: '2px 11px',
  }),
  menu: (provided, state) => ({
    label: 'menu',
    background: '#FFFFFF',
    top: '100%',
    position: 'absolute',
    zIndex: 1,
    paddingTop: state.options.length ? 12 : 0,
    width: 388,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.3)',
  }),
};

const CustomControl = ({ children, ...props }) => (
  <components.Control {...props}>
    <img
      src={searchIcon}
      alt="search icon"
      style={{}}
    />
    {children}
  </components.Control>
);

const CustomOption = ({ children, ...props }) => {
  const {
    data: {
      username, koreanName, name, profilePhoto,
    },
  } = props;
  return (
    <components.Option {...props}>
      <img src={profilePhoto || defaultProfile} />
      {username} - {koreanName || name}
    </components.Option>
  );
};

CustomOption.propTypes = { ...components.Option.propTypes };

const SearchSelect = ({ ...props }) => (
  <Select
    async
    styles={customStyles}
    isClearable
    components={{
      DropdownIndicator: null,
      Control: CustomControl,
      Option: CustomOption,
    }}
    {...props}
  />
);

SearchSelect.propTypes = {
  ...Select.propTypes,
};

SearchSelect.defaultProps = {

};

export default SearchSelect;
