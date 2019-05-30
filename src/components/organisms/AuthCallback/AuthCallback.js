import React, { PureComponent } from "react"
import queryString from "query-string"
import PropTypes from "prop-types"

import AuthCallbackWrapper from "./AuthCallback.styled"

class AuthCallback extends PureComponent {
	componentDidMount() {
		const { location, loginCallback, history } = this.props
		const { code, state } = queryString.parse(location.search)
		if (code && state) {
			loginCallback(code, state)
				.then(res => {
					history.replace("/")
				})
				.catch(error => {
					alert(error.message)
					history.replace("/")
				})
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		console.log(this.props.jwt)
	}

	render() {
		return (
			null
		)
	}
}

AuthCallback.propTypes = {
}

AuthCallback.defaultProps = {
}

export default AuthCallback
