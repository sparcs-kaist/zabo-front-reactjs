import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import { Link, NavLink } from "react-router-dom"

import HeaderWrapper from "./Header.styled"

class Header extends PureComponent {

	render() {
		return (
			<HeaderWrapper>
				<a href="/api/auth/login">Login</a>
				<NavLink to="/" exact>Home</NavLink>
				<NavLink to="/main">Main</NavLink>
				<NavLink to="/upload">Upload</NavLink>
				<a href='#' onClick={this.props.logout}>Logout</a>
			</HeaderWrapper>
		)
	}
}

Header.propTypes = {}

Header.defaultProps = {}

export default Header
