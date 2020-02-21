import React from 'react';
import PropTypes from 'prop-types';
import { faCoffee, faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const icons = {
  coffee: faCoffee,
  user: faUser,
  plus: faPlus,
};

const SVG = props => <FontAwesomeIcon {...props} icon={icons[props.icon] || null} />;

SVG.propTypes = {
  ...FontAwesomeIcon.propTypes,
  icon: PropTypes.oneOf (Object.keys (icons)).isRequired,
};

SVG.defaultProps = {};

export default SVG;
