import React, { PureComponent } from "react"
import { connect } from "react-redux"

import { logout } from "../../../store/reducers/auth"

import Header from "./Header"

import { isAuthenticated } from "../../../lib/utils"

class HeaderContainer extends PureComponent {
	render() {
		return (
			<Header {...this.props} />
		)
	}
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: isAuthenticated(state)
	}
}

const mapDispatchToProps = {
	logout
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HeaderContainer)
