import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import { Switch, Route, Redirect } from "react-router-dom"

import AuthPageWrapper from "./AuthPage.styled"

import { LoginPage } from "../index"

class AuthPage extends PureComponent {
	render() {
		return (
			<AuthPageWrapper>
				<Switch>
					<Route path="/auth/login" component={LoginPage} />
					<Redirect to="/abcd" />
				</Switch>
			</AuthPageWrapper>
		)
	}
}

AuthPage.propTypes = {
}

AuthPage.defaultProps = {
}

export default AuthPage
