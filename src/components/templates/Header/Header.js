import React, { PureComponent } from "react"
import { NavLink } from "react-router-dom"

import HeaderWrapper from "./Header.styled"

import logo from "static/logo/logo.svg"
import left from "static/images/chevron_left.svg"

import SVG from "atoms/SVG"

class Header extends PureComponent {
	goBack = () => {
		const { history } = this.props
		history.goBack()
	}

	render() {
		const { isAuthenticated } = this.props
		const { route } = this.props.match.params

		return (
			<HeaderWrapper>
				<div className="container">
					{route ? (
						<img alt="Go back" src={left} style={{ width: "15px", height: "auto" }} onClick={this.goBack} />
					) : (
						<React.Fragment>
							<NavLink to="/">
								<img alt="logo" src={logo} style={{ width: "70px", height: "30px" }} />
							</NavLink>
							{isAuthenticated ? (
								<div>
									<NavLink to="/my-page" size="md" className="user-icon">
										<SVG icon={"user"} />
									</NavLink>

									<a href="#" onClick={this.props.logout}>
										Logout
									</a>
								</div>
							) : (
								<NavLink to="/auth/login">Login</NavLink>
							)}
						</React.Fragment>
					)}
				</div>
			</HeaderWrapper>
		)
	}
}

Header.propTypes = {}

Header.defaultProps = {}

export default Header
