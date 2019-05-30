import React, { PureComponent } from "react"
import { connect } from "react-redux"

import { logout } from "../../../store/reducers/auth"

import Header from "./Header"

class HeaderContainer extends PureComponent {
	render() {
		return (
			<Header {...this.props} />
		)
	}
}

const mapStateToProps = (state) => {
	return {

	}
}

const mapDispatchToProps = {
	logout
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HeaderContainer)
