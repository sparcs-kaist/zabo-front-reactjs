import React from "react"
import PropTypes from "prop-types"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faUser } from '@fortawesome/free-solid-svg-icons'

const icons = {
	coffee: faCoffee,
	user: faUser
}

const SVG = (props) => <FontAwesomeIcon {...props} icon={icons[props.icon] || null} />

SVG.propTypes = {
	icon: PropTypes.oneOf(Object.keys(icons)).isRequired
}

SVG.defaultProps = {
}

export default SVG
