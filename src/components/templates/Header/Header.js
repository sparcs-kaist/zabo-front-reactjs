import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import { Link, NavLink } from "react-router-dom"

import HeaderWrapper from "./Header.styled"

import logo from "static/logo/logo.svg"
import SVG from "atoms/SVG"

class Header extends PureComponent {

	render() {
		return (
			<HeaderWrapper>
				<NavLink to="/">
					<img src={logo} style={{ width: "70px", height: "30px" }}/>
				</NavLink>
				<NavLink to="/my-page">
					<SVG icon={'user'}/>
				</NavLink>
				{/*<a href="/api/auth/login">Login</a>*/}
				{/*<NavLink to="/" exact>Home</NavLink>*/}
				{/*<NavLink to="/main">Main</NavLink>*/}
				{/*<NavLink to="/upload">Upload</NavLink>*/}
				{/*<a href='#' onClick={this.props.logout}>Logout</a>*/}
			</HeaderWrapper>
		)
	}
}

Header.propTypes = {}

Header.defaultProps = {}

export default Header
