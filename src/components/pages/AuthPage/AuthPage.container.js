import React, { PureComponent } from "react"
import { connect } from "react-redux"

import AuthPage from "./AuthPage"

class AuthPageContainer extends PureComponent {
	render() {
		return (
			<AuthPage {...this.props} />
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
)(AuthPageContainer)