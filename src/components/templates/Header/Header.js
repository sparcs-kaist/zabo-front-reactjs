import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import { Link, NavLink } from "react-router-dom"

import HeaderWrapper from "./Header.styled"

import logo from "static/logo/logo.svg"
import SVG from "atoms/SVG"

class Header extends PureComponent {

	render() {
		const { isAuthenticated } = this.props

		return (
			<HeaderWrapper>
				<div className="container">
					<NavLink to="/">
						<img src={logo} style={{ width: "70px", height: "30px" }}/>
					</NavLink>
					{
						isAuthenticated ?
							<React.Fragment>
								<NavLink to="/my-page" style={{ marginRight: "4px"}} size="md">
									<SVG icon={'user'} />
								</NavLink>
								<a href='#' onClick={this.props.logout}>Logout</a>
							</React.Fragment>
							:
							<NavLink to="/auth/login">Login</NavLink>
					}
					{/*<a href="/api/auth/login">Login</a>*/}
					{/*<NavLink to="/main">Main</NavLink>*/}
					{/*<NavLink to="/upload">Upload</NavLink>*/}
				</div>
			</HeaderWrapper>
		)
	}
}

Header.propTypes = {}

Header.defaultProps = {}

export default Header
