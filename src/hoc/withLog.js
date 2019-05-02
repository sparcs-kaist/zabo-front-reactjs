import React from "react"

const withLog = WrappedComponent => {
	const displayName = WrappedComponent.displayName || WrappedComponent.name
	return class extends React.PureComponent {
		constructor(props) {
			super(props)
			console.log(`%c[${displayName}] : constructor`, "color: #4CAF50;")
		}

		componentDidMount() {
			console.log(`%c[${displayName}] : componentDidMount`, "color: #2196F3;", this.props)
		}

		componentDidUpdate(prevProps, state) {
			console.log(
				`%c[${displayName}] : componentDidUpdate`,
				"color: #2196F3;",
				prevProps,
				this.props,
			)
		}

		componentWillUnmount() {
			console.log(`%c[${displayName}] : componentWillUnmount`, "color: #F44336;")
		}

		render() {
			return <WrappedComponent {...this.props} />
		}
	}
}

export default withLog
