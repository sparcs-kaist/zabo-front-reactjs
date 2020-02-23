import React from 'react';
import PropTypes from 'prop-types';
import {
  faArrowRight, faCoffee, faPlus, faQuestionCircle,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const icons = {
  coffee: faCoffee,
  user: faUser,
  plus: faPlus,
  arrowRight: faArrowRight,
  questionCircle: faQuestionCircle,
};

const SVG = ({ icon, ...props }) => <FontAwesomeIcon {...props} icon={icons[icon] || null} />;

SVG.propTypes = {
  ...FontAwesomeIcon.propTypes,
  icon: PropTypes.oneOf (Object.keys (icons)).isRequired,
};

SVG.defaultProps = {};

export default SVG;
