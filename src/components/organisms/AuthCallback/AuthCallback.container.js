import React, { PureComponent } from "react"
import { connect } from "react-redux"

import AuthCallback from "./AuthCallback"
import toJS from "hoc/toJS"

import { loginCallback } from "../../../store/reducers/auth"

class AuthCallbackContainer extends PureComponent {
	render() {
		return (
			<AuthCallback {...this.props} />
		)
	}
}

const mapStateToProps = (state) => {
	return {
		jwt: state.getIn(["auth", "jwt"]),
		info: state.getIn(["auth", "info"])
	}
}

const mapDispatchToProps = {
	loginCallback
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(toJS(AuthCallbackContainer))
