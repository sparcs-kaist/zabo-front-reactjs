import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ToggleButtonWrapper = styled.div`
  display: inline-block;
  /* The switch - the box around the slider */
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 30px;
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #BCBCBC;
    transition: .4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 22px;
    width: 22px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
  }

  input:checked + .slider {
    background-color: #143441;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #143441;
  }

  input:checked + .slider:before {
    transform: translateX(29px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
`;

const ToggleButton = ({ handleClick }) => (
  <ToggleButtonWrapper>
    <label className="switch">
      <input type="checkbox" onClick={handleClick} />
      <span className="slider round"> </span>
    </label>
  </ToggleButtonWrapper>
);

ToggleButton.defaultProps = {
  handleClick: PropTypes.func,
};

export default ToggleButton;
