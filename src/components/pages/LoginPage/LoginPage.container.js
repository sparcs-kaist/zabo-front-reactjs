import React, { PureComponent } from "react"
import { connect } from "react-redux"

import LoginPage from "./LoginPage"

class LoginPageContainer extends PureComponent {
	render() {
		return (
			<LoginPage {...this.props} />
		)
	}
}

const mapStateToProps = (state) => {
	return {

	}
}

const mapDispatchToProps = (dispatch) => {
	return {

	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginPageContainer)