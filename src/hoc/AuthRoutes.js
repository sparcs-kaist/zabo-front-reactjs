import React from "react"
import { Redirect, Route } from "react-router-dom"
import { connect } from "react-redux"
import { isAuthenticated } from "lib/utils"

const mapStateToProps = state => ({
	isAuthenticated: isAuthenticated(state),
})

export const PrivateRoute = connect(
	mapStateToProps,
	null,
)(({ component: Component, isAuthenticated, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			isAuthenticated ? (
				<Component {...props} />
			) : (
				<Redirect
					to={{
						pathname: "/auth/login",
						state: { referrer: props.location.pathname },
					}}
				/>
			)
		}
	/>
))

export const PublicRoute = connect(
	mapStateToProps,
	null,
)(({ component: Component, isAuthenticated, ...rest }) => {
	return (
		<Route
			{...rest}
			render={props => {
				if (isAuthenticated) {
					const state = props.location.state
					if (state && state.referrer === "comeback") props.history.goBack()
					else if (state && state.referrer) props.history.replace(state.referrer)
					else {
						props.history.push("/exchange/KRW:BTC", { referrer: "public" })
					}
					return null
				}
				return <Component {...props} />
			}}
		/>
	)
})
