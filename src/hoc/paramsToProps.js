import React from "react"
import get from "lodash.get"

export default WrappedComponent => props => {
	const params = get(props, ["match", "params"]) || {}
	const downProps = {
		...props,
		...params,
	}
	return <WrappedComponent {...downProps} />
}
