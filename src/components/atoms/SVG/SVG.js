import React from "react";
import PropTypes from "prop-types";
import {
  faArrowRight,
  faCoffee,
  faPlus,
  faQuestionCircle,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import arrow from "static/icon/arrow.svg";

export const faIcons = {
  coffee: faCoffee,
  user: faUser,
  plus: faPlus,
  arrowRight: faArrowRight,
  questionCircle: faQuestionCircle,
};
const faIconList = Object.keys(faIcons);

const icons = {
  arrow,
};

const SVG = ({ icon, ...props }) => {
  if (faIconList.some((faIcon) => icon === faIcon))
    return <FontAwesomeIcon {...props} icon={faIcons[icon] || null} />;
  return <img src={icons[icon] || ""} alt={icon} />;
};

SVG.propTypes = {
  ...FontAwesomeIcon.propTypes,
  icon: PropTypes.oneOf(Object.keys(faIcons)).isRequired,
};

SVG.defaultProps = {};

export default SVG;
